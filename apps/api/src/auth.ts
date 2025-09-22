import * as authSchema from './db/schema/auth.schema';
import * as taskSchema from './db/schema/task';

import { betterAuth } from 'better-auth';
import { db } from './db/index';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: { ...taskSchema, ...authSchema },
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: 'http://localhost:3001/api/auth',
  trustedOrigins: ['http://localhost:3000', 'http://localhost:3001'],
});

export type Auth = typeof auth;
