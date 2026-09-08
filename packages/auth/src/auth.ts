import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { oneTap, openAPI, magicLink } from 'better-auth/plugins';
import { Resend } from 'resend';
import { db } from '@rights/db';
import * as schema from '@rights/db/schema';
import { getEnv } from '@rights/env';
import {
  AuthConfigError,
  PROD_URL,
  authBaseURL,
  googleCredentials,
  missingAuthEnv,
} from './auth-config';

const APP_NAME = 'Rights Institute';

/**
 * Build the better-auth instance from the *runtime* env.
 *
 * This used to run at module scope off `process.env`, which had two
 * problems: values only present in the Cloudflare Worker's per-request
 * runtime env were invisible, and anything that failed during construction
 * took down every route importing this module — `/api/auth/get-session`
 * included — as an opaque 500. It is now built on first use, from getEnv(),
 * only when the required vars are present; optional integrations are
 * registered only when their credentials exist, so a half-configured
 * deployment loses just that integration.
 */
function createAuth() {
  const missing = missingAuthEnv();
  if (missing.length > 0) throw new AuthConfigError(missing);

  const google = googleCredentials();
  if (!google) {
    console.warn(
      '[auth] GOOGLE_CLIENT_ID/GOOGLE_CLIENT_SECRET not set — Google sign-in and the One Tap prompt are disabled.'
    );
  }

  return betterAuth({
    baseURL: authBaseURL(),
    secret: getEnv('BETTER_AUTH_SECRET'),
    trustedOrigins: [PROD_URL, 'https://www.rights.institute', 'http://localhost:3000'],
    database: drizzleAdapter(db, {
      provider: 'sqlite',
      schema,
    }),
    ...(google ? { socialProviders: { google } } : {}),
    emailVerification: {
      sendOnSignUp: false,
      autoSignInAfterVerification: true,
    },
    plugins: [
      // One Tap exchanges a Google ID token, so it is only useful when the
      // Google provider above is configured.
      ...(google ? [oneTap()] : []),
      openAPI(),
      magicLink({
        expiresIn: 300,
        disableSignUp: false,
        sendMagicLink: async ({ email, url }) => {
          const apiKey = getEnv('AUTH_RESEND_KEY');
          if (!apiKey) {
            console.warn('[auth] AUTH_RESEND_KEY missing — magic link not sent. URL:', url);
            return;
          }
          const resend = new Resend(apiKey);
          await resend.emails.send({
            from: `${APP_NAME} <noreply@rights.institute>`,
            to: email,
            subject: `Sign in to ${APP_NAME}`,
            html: `<p>Click the link below to sign in to ${APP_NAME}:</p>
                 <p><a href="${url}">Sign in</a></p>
                 <p>This link expires in 5 minutes.</p>`,
          });
        },
      }),
    ],
  });
}

let _auth: ReturnType<typeof createAuth> | null = null;

/** The better-auth instance, created on first use. Throws AuthConfigError when required vars are missing. */
export function getAuth() {
  if (!_auth) _auth = createAuth();
  return _auth;
}

/**
 * Same shape as before — `auth.api.getSession(...)`, `auth.handler(...)` —
 * but importing this module no longer constructs anything.
 */
export const auth = new Proxy({} as ReturnType<typeof createAuth>, {
  get(_target, prop) {
    const instance = getAuth() as any;
    const value = instance[prop];
    return typeof value === 'function' ? value.bind(instance) : value;
  },
});

export { AuthConfigError, missingAuthEnv, isAuthConfigured } from './auth-config';
