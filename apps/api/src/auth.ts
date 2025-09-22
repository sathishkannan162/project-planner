import * as schema from './db/schema';

import { betterAuth } from 'better-auth';
import { db } from './db/schema';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: 'http://localhost:3001/api/auth',
  trustedOrigins: ['http://localhost:3000', 'http://localhost:3001'],
});

export type Auth = typeof auth;
