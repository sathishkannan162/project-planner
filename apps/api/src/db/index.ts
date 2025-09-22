import 'dotenv/config';

import * as authSchema from './schema/auth.schema';
import * as schema from './schema/task';

import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const pool = new Pool({
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool, {
  schema: { ...schema, ...authSchema },
});
