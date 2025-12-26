import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from './db';
import { oneTap, openAPI, magicLink } from "better-auth/plugins";
import * as schema from './db/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    schema: schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }
  },


  emailVerification: {
    sendOnSignUp: false,
    autoSignInAfterVerification: true,
  },
  plugins: [
    oneTap(),
    openAPI(),
    magicLink({
      sendMagicLink: async ({ email, url, token }) => {

      },
      expiresIn: 300, // 5 minutes
      disableSignUp: false, // Allow new users to sign up via magic link
    }),
  ],
});
