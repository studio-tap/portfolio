import React from 'react';

type IconBaseProps = {
  children: React.ReactNode;
  className?: string;
  size?: string; // Tailwind CSSのtext-xlなどに対応
};

export const IconBase = ({ children, className, size = 'text-m' }: IconBaseProps): React.ReactElement => {
  return <span className={`${size} leading-none ${className}`}>{children}</span>;
};
