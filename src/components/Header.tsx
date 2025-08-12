import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { HeaderNav } from './HeaderNav';

type NavItem = {
  href: string;
  text: string;
};

export const Header = (): React.ReactElement => {
  const navItems: NavItem[] = [
    { href: '/projects', text: 'WORKS' },
    { href: '/about', text: 'ABOUT' },
  ];

  return (
    <header className="flex justify-between items-center p-4">
      <h1>My Portfolio</h1>
      <HeaderNav navItems={navItems} />
      <ThemeSwitcher />
    </header>
  );
};
