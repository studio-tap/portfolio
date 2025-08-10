import React from 'react';
import Link from 'next/link';

type HeaderNavigationItemProps = {
  href: string;
  text: string;
};

export const HeaderNavigationItem = ({ href, text }: HeaderNavigationItemProps): React.ReactElement => {
  return (
    <li>
      <Link href={href}>{text}</Link>
    </li>
  );
};
