import Link, { LinkProps } from 'next/link';
import React from 'react';

type BaseLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & LinkProps & {
  children: React.ReactNode;
  className?: string;
};

export const BaseLink = ({ children, className = '', ...props }: BaseLinkProps): React.ReactElement => {
  const baseClasses = 'link-base';

  return (
    <Link {...props} className={`${baseClasses} ${className}`}>
      {children}
    </Link>
  );
};