import './assets';

import { ReactNode } from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'GPTGenius | Dashboard',
  description: 'GPTGenius: Your AI language companion. Powered by OpenAI.',
};

export function DashboardLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      Dashboard Layout
      {children}
    </div>
  );
}
