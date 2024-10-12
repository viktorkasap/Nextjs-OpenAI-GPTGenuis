'use client';

import { PropsWithChildren } from 'react';

import { Toaster } from 'react-hot-toast';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default Providers;
