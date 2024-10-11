'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/about/info', label: 'About → Info' },
  { href: '/drinks', label: 'Drinks' },
  { href: '/tasks', label: 'Tasks' },
  // { href: '/prisma', label: 'Prisma' },
  { href: '/client', label: 'Client' },
];

export const Navigation = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav className="bg-base-300 py-4">
      <div className="navbar px-8 max-w-6xl mx-auto flex-col sm:flex-row sm:justify-between">
        <ul className="menu menu-horizontal md:ml-8">
          {links.map(({ href, label }) => (
            <li key={label}>
              <Link
                className={`capitalize ${isActive(href) ? 'active' : ''}`}
                href={href}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
