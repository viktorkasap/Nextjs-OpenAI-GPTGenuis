'use client';

import { PropsWithChildren, Suspense } from 'react';

import { ClerkProvider } from '@clerk/nextjs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // => 1 min
    },
  },
});

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <Suspense>
      <ClerkProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ClerkProvider>
    </Suspense>
  );
};

export default Providers;
