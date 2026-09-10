/**
 * @fileoverview Covers how the browser finds the Google client ID.
 *
 * One Tap silently does nothing without it, and on Cloudflare the value
 * usually exists only in the Worker's runtime env — the layout's inlined copy
 * is baked at build time on statically-generated routes and arrives empty.
 * These pin the fallback chain that fixes that: script tag, then the
 * build-time NEXT_PUBLIC_ copy, then /api/client-config.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

/** Fresh module state per test — the resolved ID is cached at module scope. */
async function loadClient() {
  vi.resetModules();
  return import('./auth-client');
}

function writeScriptTag(value: unknown) {
  const el = document.createElement('script');
  el.id = 'google-client-id';
  el.type = 'application/json';
  el.textContent = JSON.stringify(value);
  document.head.appendChild(el);
}

beforeEach(() => {
  document.head.innerHTML = '';
  delete process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
});

afterEach(() => {
  vi.restoreAllMocks();
  delete process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
});

describe('googleClientId', () => {
  it('reads the ID the root layout inlined', async () => {
    writeScriptTag('from-layout.apps.googleusercontent.com');

    const { googleClientId } = await loadClient();

    expect(googleClientId()).toBe('from-layout.apps.googleusercontent.com');
  });

  it('falls back to the build-time NEXT_PUBLIC_ copy', async () => {
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID = 'from-build.apps.googleusercontent.com';

    const { googleClientId } = await loadClient();

    expect(googleClientId()).toBe('from-build.apps.googleusercontent.com');
  });

  it('is empty rather than throwing when the tag holds junk', async () => {
    const el = document.createElement('script');
    el.id = 'google-client-id';
    el.type = 'application/json';
    el.textContent = '{not json';
    document.head.appendChild(el);

    const { googleClientId } = await loadClient();

    expect(googleClientId()).toBe('');
  });

  it('is empty when nothing has provided an ID', async () => {
    const { googleClientId } = await loadClient();

    expect(googleClientId()).toBe('');
  });
});

describe('ensureGoogleClientId', () => {
  it('fetches the runtime config when the inlined copy is empty', async () => {
    // What a statically-prerendered layout actually ships on Cloudflare.
    writeScriptTag('');
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ googleClientId: 'from-worker.apps.googleusercontent.com' }), {
        headers: { 'content-type': 'application/json' },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const { ensureGoogleClientId, googleClientId } = await loadClient();

    await expect(ensureGoogleClientId()).resolves.toBe('from-worker.apps.googleusercontent.com');
    expect(fetchMock).toHaveBeenCalledWith('/api/client-config', expect.anything());
    // Cached, so the One Tap plugin's clientId getter sees it synchronously.
    expect(googleClientId()).toBe('from-worker.apps.googleusercontent.com');
  });

  it('does not fetch when the ID is already known', async () => {
    writeScriptTag('from-layout.apps.googleusercontent.com');
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);

    const { ensureGoogleClientId } = await loadClient();

    await expect(ensureGoogleClientId()).resolves.toBe('from-layout.apps.googleusercontent.com');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('asks the endpoint at most once per page load', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ googleClientId: 'from-worker.apps.googleusercontent.com' })),
    );
    vi.stubGlobal('fetch', fetchMock);

    const { ensureGoogleClientId } = await loadClient();

    await Promise.all([ensureGoogleClientId(), ensureGoogleClientId(), ensureGoogleClientId()]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('resolves empty — never rejects — when the endpoint is unreachable', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

    const { ensureGoogleClientId } = await loadClient();

    await expect(ensureGoogleClientId()).resolves.toBe('');
  });

  it('resolves empty when Google simply is not configured', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(new Response(JSON.stringify({ googleClientId: '' }))),
    );

    const { ensureGoogleClientId } = await loadClient();

    await expect(ensureGoogleClientId()).resolves.toBe('');
  });
});

describe('authClient one-tap configuration', () => {
  it('resolves the client ID lazily, so a late fetch still reaches Google', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ googleClientId: 'late.apps.googleusercontent.com' })),
      ),
    );

    const { authClient, ensureGoogleClientId } = await loadClient();
    // The plugin reads options.clientId when the prompt is requested, not when
    // the client is built — the regression that left One Tap with an empty ID.
    const options = (authClient as unknown as { options?: unknown }).options;
    expect(options).toBeDefined();

    await ensureGoogleClientId();

    const { googleClientId } = await import('./auth-client');
    expect(googleClientId()).toBe('late.apps.googleusercontent.com');
  });
});
