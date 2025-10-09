import React from 'react';
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';
import { HeaderNav } from './HeaderNav';
import { Typography } from '@/components/Typography/Typography';

export const Header = (): React.ReactElement => {
  return (
    <header className="flex justify-between items-center p-4 border-b border-black">
      <Link href="/">
        <Typography as="h1" variant="logo" className="font-bold">
          STUDIO-TAP
        </Typography>
      </Link>
      <HeaderNav />
      <ThemeSwitcher />
    </header>
  );
};
