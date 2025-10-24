import React from 'react';
import { HeaderNavigationItem } from './HeaderNavigationItem';

type NavItem = {
  href: string;
  text: string;
};

type Props = {
  currentPath: string;
  isMobile?: boolean;
};

export const HeaderNav = ({ currentPath, isMobile = false }: Props): React.ReactElement => {

  const navItems: NavItem[] = [
    { href: '/', text: 'WORKS' },
    { href: '/about', text: 'ABOUT' },
  ];

  return (
    <nav>
      <ul className={isMobile ? 'flex flex-col items-center space-y-4' : 'flex space-x-4'}>
        {navItems.map((item) => (
          <HeaderNavigationItem
            key={item.href}
            href={item.href}
            text={item.text}
            isActive={currentPath === item.href}
          />
        ))}
      </ul>
    </nav>
  );
};
