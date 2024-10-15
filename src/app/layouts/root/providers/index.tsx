'use client';

import { PropsWithChildren } from 'react';

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
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default Providers;
