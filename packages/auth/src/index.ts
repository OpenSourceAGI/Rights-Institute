/**
 * Server-side auth entry point.
 *
 * Deliberately re-exports only the server instance and the request-time
 * config helpers — the React components and the browser client live behind
 * their own subpaths (`@rights/auth/AuthProvider`, `@rights/auth/auth-client`)
 * so importing `auth` in a route handler doesn't drag client code with it.
 */
export { auth, getAuth, AuthConfigError, missingAuthEnv, isAuthConfigured } from './auth';
