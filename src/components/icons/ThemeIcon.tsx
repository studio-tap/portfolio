import React from 'react';
import { IconBase } from './IconBase';

type ThemeIconProps = {
  children: React.ReactNode;
  className?: string;
};

export const ThemeIcon = ({ children, className }: ThemeIconProps): React.ReactElement => {
  return (
    <IconBase className={`inline-block w-[2em] p-[0.5em] ${className}`} size={'text-xl'}>
      {children}
    </IconBase>
  );
};
