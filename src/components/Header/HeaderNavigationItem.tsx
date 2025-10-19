'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Typography } from '@/components/Typography/Typography';

type HeaderNavigationItemProps = {
  href: string;
  text: string;
  onClick?: () => void;
};

export const HeaderNavigationItem = ({ href, text, onClick }: HeaderNavigationItemProps): React.ReactElement => {
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
          ${isActive ? 'font-bold pointer-events-none' : 'font-medium hover-opacity-strong'}
        `}
        aria-disabled={isActive}
        onClick={onClick}
      >
        {text}
      </Typography>
    </li>
  );
};
