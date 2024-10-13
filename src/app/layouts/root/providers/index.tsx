'use client';

import { PropsWithChildren } from 'react';

import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'react-hot-toast';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  );
};

export default Providers;
