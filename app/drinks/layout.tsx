import { ReactNode } from 'react';

export default function DrinksLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div className="max-w-xl">
      <div className="mockup-code mb-8">
        <pre data-prefix="$">
          <code>pnpm dev</code>
        </pre>
      </div>
      {children}
    </div>
  );
}
