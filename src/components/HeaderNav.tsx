import React from 'react';
import { HeaderNavigationItem } from './HeaderNavigationItem';

type NavItem = {
  href: string;
  text: string;
};

type HeaderNavProps = {
  navItems: NavItem[];
};

export const HeaderNav = ({ navItems }: HeaderNavProps): React.ReactElement => {
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
