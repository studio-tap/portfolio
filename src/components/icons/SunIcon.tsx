import React from 'react';
import { ThemeIcon } from './ThemeIcon';

type SunIconProps = {
  className?: string;
  size?: string;
};

export const SunIcon = ({ className, size }: SunIconProps): React.ReactElement => {
  return (
    <ThemeIcon className={`${className}`} size={size}>
      {''} {/* Nerd Font Unicode for fa-sun */}
    </ThemeIcon>
  );
};
