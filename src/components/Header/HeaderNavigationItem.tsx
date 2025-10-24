import React from 'react';
import Link from 'next/link';
import { Typography } from '@/components/Typography/Typography';

type HeaderNavigationItemProps = {
  href: string;
  isActive: boolean;
  text: string;
};

export const HeaderNavigationItem = ({ href, isActive, text }: HeaderNavigationItemProps): React.ReactElement => {
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
