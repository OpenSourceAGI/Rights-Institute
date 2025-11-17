# Authentication Setup Guide

This guide will help you set up Google OAuth authentication with better-auth and Cloudflare D1 database.

## Prerequisites

- A Google Cloud Project
- Cloudflare account with Workers and D1 access
- Node.js 18+ or Bun installed

## 1. Google OAuth Setup

### Create OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth client ID**
5. Select **Web application** as the application type
6. Configure the OAuth consent screen if prompted
7. Add authorized JavaScript origins:
   - `http://localhost:8787` (for local development)
   - `http://localhost:3000` (for Next.js dev server)
   - `https://your-domain.com` (for production)
8. Add authorized redirect URIs:
   - `http://localhost:8787/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-domain.com/api/auth/callback/google`
9. Click **Create** and copy your **Client ID** and **Client Secret**

### Enable Google One Tap

Google One Tap is automatically enabled when you configure the Google OAuth provider in better-auth.

## 2. Cloudflare D1 Database Setup

### Create D1 Databases

```bash
# Create development database
npx wrangler d1 create rights-db

# Create staging database
npx wrangler d1 create rights-db-staging

# Create production database
npx wrangler d1 create rights-db-prod
```

### Update wrangler.toml

After creating the databases, update the `database_id` fields in `wrangler.toml` with the IDs from the output:

```toml
[[d1_databases]]
binding = "DB"
database_name = "rights-db"
database_id = "your-dev-database-id"

[env.production]
name = "rights-prod"
[[env.production.d1_databases]]
binding = "DB"
database_name = "rights-db-prod"
database_id = "your-prod-database-id"
```

### Run Database Migrations

```bash
# For local/development
npx wrangler d1 execute rights-db --local --file=./db/migrations/0000_brown_virginia_dare.sql

# For production
npx wrangler d1 execute rights-db-prod --file=./db/migrations/0000_brown_virginia_dare.sql
```

## 3. Environment Variables

### Create .env file

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com

# Generate with: openssl rand -base64 32
BETTER_AUTH_SECRET=your-random-secret-key

BETTER_AUTH_URL=http://localhost:8787
NEXT_PUBLIC_APP_URL=http://localhost:8787
```

### For Next.js Development

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

## 4. Development

### Local Development with Wrangler

```bash
# Build the Next.js app
bun run build

# Start the Cloudflare Worker locally
npx wrangler dev
```

The app will be available at `http://localhost:8787`

### Local Development with Next.js Dev Server

```bash
bun run dev
```

The app will be available at `http://localhost:3000`

**Note:** For full authentication to work locally, you need to use the Wrangler dev server since it includes the D1 database and worker API routes.

## 5. Deployment

### Deploy to Cloudflare

```bash
# Deploy to production
bun run serve

# Or deploy manually
bun run build
npx wrangler deploy --env production
```

### Set Production Environment Variables

```bash
# Set secrets in Cloudflare
echo "your-client-secret" | npx wrangler secret put GOOGLE_CLIENT_SECRET --env production
echo "your-random-secret" | npx wrangler secret put BETTER_AUTH_SECRET --env production

# Set environment variables
npx wrangler publish --env production \
  --var GOOGLE_CLIENT_ID:your-client-id.apps.googleusercontent.com \
  --var BETTER_AUTH_URL:https://your-domain.com
```

## 6. Testing

Visit `http://localhost:8787` (or your production URL) and:

1. Click "Sign in with Google"
2. Complete the OAuth flow
3. You should be redirected back and see your user info in the top right

### Test Google One Tap

Google One Tap will automatically appear on page load for signed-out users.

### Test API Endpoints

Visit `/api-docs` to see the Swagger UI documentation and test the API endpoints.

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/auth/sign-in/email` - Sign in with email/password
- `POST /api/auth/sign-up/email` - Sign up with email/password
- `POST /api/auth/sign-in/social` - Sign in with Google
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/session` - Get current session
- `GET /api/user` - Get current user info

## Database Schema

The database includes these tables:

- `users` - User accounts
- `sessions` - Active sessions
- `accounts` - OAuth provider connections
- `verification_tokens` - Email verification tokens

## Security Considerations

1. **Never commit `.env` files** - They contain sensitive credentials
2. **Use strong secrets** - Generate BETTER_AUTH_SECRET with `openssl rand -base64 32`
3. **Configure CORS properly** - Update CORS settings in `worker/index.ts` for production
4. **HTTPS in production** - Always use HTTPS for production deployments
5. **Rotate secrets regularly** - Update OAuth credentials and auth secrets periodically

## Troubleshooting

### "Unauthorized" errors

- Check that GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are set correctly
- Verify redirect URIs in Google Cloud Console match your app URLs
- Ensure D1 database migrations have been run

### Database errors

- Run migrations: `npx wrangler d1 execute rights-db --local --file=./db/migrations/0000_brown_virginia_dare.sql`
- Check that database_id in wrangler.toml matches your D1 database

### Google One Tap not appearing

- Verify NEXT_PUBLIC_GOOGLE_CLIENT_ID is set
- Check browser console for errors
- Ensure you're on HTTP/HTTPS (not file://)

## Additional Resources

- [better-auth Documentation](https://better-auth.com)
- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Google OAuth 2.0 Documentation](https://developers.google.com/identity/protocols/oauth2)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
