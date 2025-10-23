'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { HeaderNavigationItem } from './HeaderNavigationItem';

type NavItem = {
  href: string;
  text: string;
};

type Props = {
  isMobile?: boolean;
};

export const HeaderNav = ({ isMobile = false }: Props): React.ReactElement => {
  // ナビゲーション全体で一度だけpathnameを取得
  const pathname = usePathname();

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
            isActive={pathname === item.href}
          />
        ))}
      </ul>
    </nav>
  );
};
