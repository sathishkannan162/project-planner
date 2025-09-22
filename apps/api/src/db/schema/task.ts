import { boolean, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

import { user } from './auth.schema';

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  completed: boolean('completed').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  userId: text('user_id')
    .references(() => user.id, { onDelete: 'cascade' }),
});
