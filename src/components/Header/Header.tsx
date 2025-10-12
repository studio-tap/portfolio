import React from 'react';
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';
import { HeaderNav } from './HeaderNav';
import { Typography } from '@/components/Typography/Typography';
import { LogoIcon } from '@/components/icons/LogoIcon';

export const Header = (): React.ReactElement => {
  return (
    <header>
      <div className="flex justify-between items-center px-2 py-6 border-b-2 border-foreground-light dark:border-foreground-dark">
        <Link href="/" className="flex items-center gap-2">
          <LogoIcon className="h-[2rem] w-[2rem] text-foreground-light dark:text-foreground-dark" />
          <Typography as="h1" variant="logo" className="font-bold">
            STUDIO-TAP
          </Typography>
        </Link>
        <HeaderNav />
        <ThemeSwitcher />
      </div>
    </header>
  );
};