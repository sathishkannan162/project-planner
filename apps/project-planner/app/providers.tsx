'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { api, trpcClient } from '../lib/trpc';

import React from 'react';

function TRPCReactProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      {/* <SessionProvider client={authClient}> */}
      <api.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </api.Provider>
      {/* </SessionProvider> */}
    </>
  );
}

export { TRPCReactProvider };
