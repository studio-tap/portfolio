'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Typography } from '@/components/Typography/Typography';

type HeaderNavigationItemProps = {
  href: string;
  text: string;
};

export const HeaderNavigationItem = ({ href, text }: HeaderNavigationItemProps): React.ReactElement => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Typography
        as={Link}
        href={href}
        variant="header-nav"
        className={`
          p-2
          ${isActive ? 'font-bold pointer-events-none' : 'font-light hover-opacity-strong'}
        `}
        aria-disabled={isActive}
      >
        {text}
      </Typography>
    </li>
  );
};
