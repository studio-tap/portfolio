import Link from 'next/link';
import React from 'react';

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
        aria-disabled={isActive}
        as={Link}
        className={`p-2 ${isActive ? 'pointer-events-none font-bold' : 'font-light hover-opacity-strong'} `}
        href={href}
        variant="header-nav"
      >
        {text}
      </Typography>
    </li>
  );
};
