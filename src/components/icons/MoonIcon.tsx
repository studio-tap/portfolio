import React from 'react';
import { ThemeIcon } from './ThemeIcon';

type MoonIconProps = {
  className?: string;
  size?: string;
};

export const MoonIcon = ({ className, size }: MoonIconProps): React.ReactElement => {
  return (
    <ThemeIcon className={`${className}`} size={size}>
      {''} {/* Nerd Font Unicode for fa-moon */}
    </ThemeIcon>
  );
};
