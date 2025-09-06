import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';
import { HeaderNav } from './HeaderNav';

type NavItem = {
  href: string;
  text: string;
};

export const Header = (): React.ReactElement => {
  const navItems: NavItem[] = [
    { href: '/', text: 'WORKS' },
    { href: '/about', text: 'ABOUT' },
  ];

  return (
    <header className="flex justify-between items-center p-4">
      <Link href="/">
        <Image src="/logo_1.png" alt="STUDIO-TAP Logo" width={120} height={40} />
      </Link>
      <HeaderNav navItems={navItems} />
      <ThemeSwitcher />
    </header>
  );
};
