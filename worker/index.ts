import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createAuth } from '../lib/auth';
import { drizzle } from 'drizzle-orm/d1';
import { documents } from '../db/schema';
import { eq, desc } from 'drizzle-orm';

type Bindings = {
  DB: D1Database;
  ASSETS: Fetcher;
};

const app = new Hono<{ Bindings: Bindings }>();

// CORS middleware
app.use('*', cors({
  origin: '*',
  credentials: true,
}));

// Health check endpoint
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth routes - all better-auth routes under /api/auth/*
app.all('/api/auth/*', async (c) => {
  const auth = createAuth(c.env.DB);

  // Create a Request object that better-auth expects
  const request = new Request(c.req.url, {
    method: c.req.method,
    headers: c.req.raw.headers,
    body: c.req.method !== 'GET' && c.req.method !== 'HEAD'
      ? await c.req.raw.clone().text()
      : undefined,
  });

  // Handle the auth request
  const response = await auth.handler(request);

  return response;
});

// User info endpoint
app.get('/api/user', async (c) => {
  const auth = createAuth(c.env.DB);

  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  return c.json({
    user: session.user,
    session: {
      id: session.session.id,
      expiresAt: session.session.expiresAt,
    }
  });
});

// Helper function to get the current user session
async function getUserSession(c: any) {
  const auth = createAuth(c.env.DB);
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return null;
  }

  return session;
}

// Document API endpoints

// Get all documents for the current user
app.get('/api/documents', async (c) => {
  const session = await getUserSession(c);
  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const db = drizzle(c.env.DB);
  const userDocuments = await db
    .select()
    .from(documents)
    .where(eq(documents.userId, session.user.id))
    .orderBy(desc(documents.updatedAt));

  return c.json(userDocuments);
});

// Get a specific document
app.get('/api/documents/:id', async (c) => {
  const session = await getUserSession(c);
  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const documentId = c.req.param('id');
  const db = drizzle(c.env.DB);

  const document = await db
    .select()
    .from(documents)
    .where(eq(documents.id, documentId))
    .limit(1);

  if (document.length === 0) {
    return c.json({ error: 'Document not found' }, 404);
  }

  // Check if the document belongs to the current user
  if (document[0].userId !== session.user.id) {
    return c.json({ error: 'Forbidden' }, 403);
  }

  return c.json(document[0]);
});

// Create a new document
app.post('/api/documents', async (c) => {
  const session = await getUserSession(c);
  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const body = await c.req.json();
  const { title, content } = body;

  if (!title || typeof title !== 'string') {
    return c.json({ error: 'Title is required' }, 400);
  }

  const db = drizzle(c.env.DB);
  const documentId = crypto.randomUUID();
  const now = new Date();

  const newDocument = {
    id: documentId,
    userId: session.user.id,
    title,
    content: content || '',
    createdAt: now,
    updatedAt: now,
  };

  await db.insert(documents).values(newDocument);

  return c.json(newDocument, 201);
});

// Update a document
app.put('/api/documents/:id', async (c) => {
  const session = await getUserSession(c);
  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const documentId = c.req.param('id');
  const body = await c.req.json();
  const { title, content } = body;

  const db = drizzle(c.env.DB);

  // Check if document exists and belongs to user
  const existingDocument = await db
    .select()
    .from(documents)
    .where(eq(documents.id, documentId))
    .limit(1);

  if (existingDocument.length === 0) {
    return c.json({ error: 'Document not found' }, 404);
  }

  if (existingDocument[0].userId !== session.user.id) {
    return c.json({ error: 'Forbidden' }, 403);
  }

  const now = new Date();
  const updates: any = { updatedAt: now };

  if (title !== undefined) updates.title = title;
  if (content !== undefined) updates.content = content;

  await db
    .update(documents)
    .set(updates)
    .where(eq(documents.id, documentId));

  const updatedDocument = {
    ...existingDocument[0],
    ...updates,
  };

  return c.json(updatedDocument);
});

// Delete a document
app.delete('/api/documents/:id', async (c) => {
  const session = await getUserSession(c);
  if (!session) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const documentId = c.req.param('id');
  const db = drizzle(c.env.DB);

  // Check if document exists and belongs to user
  const existingDocument = await db
    .select()
    .from(documents)
    .where(eq(documents.id, documentId))
    .limit(1);

  if (existingDocument.length === 0) {
    return c.json({ error: 'Document not found' }, 404);
  }

  if (existingDocument[0].userId !== session.user.id) {
    return c.json({ error: 'Forbidden' }, 403);
  }

  await db.delete(documents).where(eq(documents.id, documentId));

  return c.json({ success: true });
});

// Serve static files from the assets directory for all other routes
app.all('*', async (c) => {
  // Forward to the assets
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
