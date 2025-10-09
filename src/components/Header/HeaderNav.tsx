import React from 'react';
import { HeaderNavigationItem } from './HeaderNavigationItem';

type NavItem = {
  href: string;
  text: string;
};

export const HeaderNav = (): React.ReactElement => {
  const navItems: NavItem[] = [
    { href: '/', text: 'WORKS' },
    { href: '/about', text: 'ABOUT' },
  ];

  return (
    <nav>
      <ul className="flex space-x-4">
        {navItems.map((item) => (
          <HeaderNavigationItem key={item.href} href={item.href} text={item.text} />
        ))}
      </ul>
    </nav>
  );
};
