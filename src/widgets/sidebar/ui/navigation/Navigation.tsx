'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/chat', label: 'Chat' },
  { href: '/tours', label: 'Tours' },
  { href: '/tours/new-tour', label: 'New Tour' },
  { href: '/profile', label: 'Profile' },
];

export const Navigation = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <nav>
      <ul className="menu text-base-content">
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link className={`capitalize ${isActive(href) ? 'active' : ''}`} href={href}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};
