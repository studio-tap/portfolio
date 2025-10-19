import React from 'react';
import { HeaderNavigationItem } from './HeaderNavigationItem';

type NavItem = {
  href: string;
  text: string;
};

type Props = {
  isMobile?: boolean;
  onLinkClick?: () => void;
};

export const HeaderNav = ({ isMobile = false, onLinkClick }: Props): React.ReactElement => {
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
            onClick={onLinkClick}
          />
        ))}
      </ul>
    </nav>
  );
};
