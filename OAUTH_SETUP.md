# Google OAuth Setup Guide

This guide explains how to set up Google OAuth authentication for the Rights Institute application.

## How It Works

The application uses [better-auth](https://www.better-auth.com/) for authentication with Google OAuth. The flow is:

1. **User clicks "Sign in with Google"** → Triggers `signIn.social({ provider: 'google' })`
2. **Redirect to Google OAuth** → `/api/auth/signin/google` redirects to Google's consent page
3. **User authorizes** → Google redirects back with authorization code
4. **OAuth Callback** → `/api/auth/callback/google` exchanges code for tokens
5. **Session created** → User is authenticated and redirected to dashboard

## Setup Instructions

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select an existing one
3. Click **Create Credentials** → **OAuth 2.0 Client ID**
4. Configure the OAuth consent screen if you haven't already
5. For Application type, select **Web application**
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for local development)
   - `https://rights.institute/api/auth/callback/google` (for production)
   - Add any other domains you're using
7. Save and copy your:
   - Client ID
   - Client Secret

### 2. Set Environment Variables

Create a `.env.local` file in the root directory (copy from `.env.example`):

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com

# Better Auth Configuration
# Generate a random secret: openssl rand -base64 32
BETTER_AUTH_SECRET=your-random-secret-key-here

# App URL - adjust based on your environment
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Database Configuration (Turso)
TURSO_DATABASE_URL=your-turso-database-url
TURSO_AUTH_TOKEN=your-turso-auth-token
```

### 3. Generate Auth Secret

Run this command to generate a secure random secret:

```bash
openssl rand -base64 32
```

Copy the output and set it as `BETTER_AUTH_SECRET` in your `.env.local` file.

### 4. Database Setup

The application uses Turso (SQLite) for the database. Make sure your database has the required tables:

- `users` - User accounts
- `sessions` - Active sessions
- `accounts` - OAuth provider connections
- `verificationTokens` - Email verification tokens

Run database migrations if needed:

```bash
npx drizzle-kit push
```

## API Routes

The OAuth flow is handled by the catch-all route:

- **File**: `app/api/auth/[...all]/route.ts`
- **Handles**:
  - `/api/auth/signin/google` - Initiates OAuth flow
  - `/api/auth/callback/google` - Handles OAuth callback
  - `/api/auth/session` - Gets current session
  - `/api/auth/signout` - Signs out user

## Components

### AuthButton
**File**: `app/components/Auth/AuthButton.tsx`

Main sign-in button that:
- Shows "Sign in with Google" when not authenticated
- Displays user profile when authenticated
- Includes sign-out functionality

### GoogleOneTap
**File**: `app/components/Auth/GoogleOneTap.tsx`

Google One Tap authentication popup that:
- Automatically shows Google One Tap prompt
- Allows quick sign-in without clicking a button
- Only appears when user is not authenticated

## Testing Locally

1. Set up environment variables as described above
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Navigate to `http://localhost:3000`
4. Click "Sign in with Google" or wait for Google One Tap prompt
5. Authorize with your Google account
6. You should be redirected to `/dashboard`

## Production Deployment

For production:

1. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_APP_URL` to your production domain
2. Add production callback URL to Google OAuth credentials:
   ```
   https://your-domain.com/api/auth/callback/google
   ```
3. Set all environment variables in your hosting platform
4. Deploy your application

## Troubleshooting

### "Redirect URI mismatch" error
- Make sure the callback URL in Google Console matches exactly: `https://your-domain.com/api/auth/callback/google`
- Check that `BETTER_AUTH_URL` is set correctly

### "Invalid client" error
- Verify `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are correct
- Make sure the OAuth credentials are for a Web application type

### Session not persisting
- Check that `BETTER_AUTH_SECRET` is set and consistent
- Verify database connection is working
- Check browser cookies are enabled

### Google One Tap not showing
- Verify `NEXT_PUBLIC_GOOGLE_CLIENT_ID` is set (must have the `NEXT_PUBLIC_` prefix)
- Check browser console for errors
- Some browsers block One Tap in certain contexts

## Security Notes

- Never commit `.env` or `.env.local` files to version control
- Use strong, random values for `BETTER_AUTH_SECRET`
- Regularly rotate OAuth secrets
- Use HTTPS in production
- Review and update trusted origins in `app/lib/auth.ts` as needed

## Additional Resources

- [better-auth Documentation](https://www.better-auth.com/docs)
- [Google OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
