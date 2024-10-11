'use client';

import { PropsWithChildren } from 'react';

import { Toaster } from 'react-hot-toast';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Toaster />
      {children}
    </div>
  );
};

export default Providers;
