import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { env as cfEnv } from 'cloudflare:workers';

const handler = vi.fn();

vi.mock('@rights/auth', () => ({
  get auth() {
    return { handler };
  },
}));

const { GET, POST } = await import('../app/api/auth/[...all]/route');

const CONFIG_KEYS = ['BETTER_AUTH_SECRET', 'TURSO_DATABASE_URL'];

function configure() {
  for (const key of CONFIG_KEYS) cfEnv[key] = 'set';
}

function unconfigure() {
  for (const key of CONFIG_KEYS) {
    delete cfEnv[key];
    delete process.env[key];
  }
}

beforeEach(() => {
  unconfigure();
  handler.mockReset();
  vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  unconfigure();
  vi.restoreAllMocks();
});

const getSession = () =>
  new Request('https://rights.institute/api/auth/get-session', { method: 'GET' });
const signIn = () =>
  new Request('https://rights.institute/api/auth/sign-in/magic-link', { method: 'POST' });

describe('auth route with missing configuration', () => {
  it('answers a session read with a signed-out 200 instead of a 500', async () => {
    const response = await GET(getSession());

    expect(response.status).toBe(200);
    expect(await response.json()).toBeNull();
    expect(handler).not.toHaveBeenCalled();
  });

  it('logs which vars are missing', async () => {
    await GET(getSession());

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining('BETTER_AUTH_SECRET')
    );
  });

  it('answers a sign-in attempt with 503 and the missing var names', async () => {
    const response = await POST(signIn());

    expect(response.status).toBe(503);
    expect(await response.json()).toMatchObject({
      error: 'auth_unavailable',
      missing: CONFIG_KEYS,
    });
  });
});

describe('auth route with configuration present', () => {
  it('delegates to better-auth', async () => {
    configure();
    handler.mockResolvedValue(new Response('{"user":{}}', { status: 200 }));

    const response = await GET(getSession());

    expect(handler).toHaveBeenCalledOnce();
    expect(response.status).toBe(200);
  });

  it('degrades a failing session read to signed-out rather than 500', async () => {
    configure();
    handler.mockRejectedValue(new Error('database unreachable'));

    const response = await GET(getSession());

    expect(response.status).toBe(200);
    expect(await response.json()).toBeNull();
    expect(console.error).toHaveBeenCalled();
  });

  it('surfaces a failing sign-in as 503', async () => {
    configure();
    handler.mockRejectedValue(new Error('database unreachable'));

    const response = await POST(signIn());

    expect(response.status).toBe(503);
  });
});
