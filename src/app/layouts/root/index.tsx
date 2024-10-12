import './assets';

import { ReactNode } from 'react';

import type { Metadata } from 'next';
import localFont from 'next/font/local';

import Providers from '../providers';

import { Navigation } from '@/widgets/navigation';

const geistSans = localFont({
  src: './assets/fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './assets/fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Next OpenAI',
};

export function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header>
          <Navigation />
        </header>
        <main className="px-8 py-20 max-w-6xl mx-auto">
          {/* Providers uses "use client", and therefore the children forcibly made client components   */}
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
