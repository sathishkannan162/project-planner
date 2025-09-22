import type { AppRouter } from 'api/trpc/router';
import { createTRPCReact } from '@trpc/react-query';
import { httpBatchLink } from '@trpc/client';

export const api = createTRPCReact<AppRouter, any, null>();

export const trpcLinks = [
  httpBatchLink({
    url: 'http://localhost:3001/trpc',
  }),
];

export const trpcClient = api.createClient({
  links: trpcLinks,
});