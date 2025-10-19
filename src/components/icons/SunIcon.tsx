import React from 'react';
import { ThemeIcon } from './ThemeIcon';

type SunIconProps = {
  className?: string;
};

export const SunIcon = ({ className }: SunIconProps): React.ReactElement => {
  return (
    <ThemeIcon className={`${className}`}>
      {''} {/* Nerd Font Unicode for fa-sun */}
    </ThemeIcon>
  );
};
