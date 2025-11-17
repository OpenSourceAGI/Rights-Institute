import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createAuth } from '../lib/auth';

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

// Serve static files from the assets directory for all other routes
app.all('*', async (c) => {
  // Forward to the assets
  return c.env.ASSETS.fetch(c.req.raw);
});

export default app;
