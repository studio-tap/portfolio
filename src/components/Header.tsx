import React from 'react';
import { HeaderNavigationItem } from './HeaderNavigationItem';

type NavItem = {
  href: string;
  text: string;
};

export const Header = (): React.ReactElement => {
  const navItems: NavItem[] = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About' },
    { href: '/projects', text: 'Projects' },
    { href: '/contact', text: 'Contact' },
  ];

  return (
    <header>
      <h1>My Portfolio</h1>
      <nav>
        <ul>
          {navItems.map((item) => (
            <HeaderNavigationItem key={item.href} href={item.href} text={item.text} />
          ))}
        </ul>
      </nav>
    </header>
  );
};
