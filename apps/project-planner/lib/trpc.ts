import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from 'api/trpc/router';

export const api: ReturnType<typeof createTRPCReact<AppRouter>> =
  createTRPCReact<AppRouter>();

export const trpcLinks = [
  httpBatchLink({
    url: 'http://localhost:3001/trpc',
    fetch(url, options) {
      return fetch(url, {
        ...options,
        credentials: 'include',
      });
    },
  }),
];

export const trpcClient = api.createClient({
  links: trpcLinks,
});
