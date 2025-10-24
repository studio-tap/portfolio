'use client';

import React, { useEffect, useState } from 'react';
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
  // SSR時の空pathname問題を回避するため、クライアント側でstateに写す
  const [activePath, setActivePath] = useState<string | null>(null);

  // ハイドレーション後にpathnameをstateへ反映して再レンダーを強制
  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

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
            isActive={activePath === item.href}
          />
        ))}
      </ul>
    </nav>
  );
};
