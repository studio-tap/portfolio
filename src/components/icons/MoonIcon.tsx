import { clsx } from 'clsx';
import React from 'react';

import { ThemeIcon } from './ThemeIcon';

type MoonIconProps = {
  className?: string;
};

export const MoonIcon = ({ className }: MoonIconProps): React.ReactElement => {
  return (
    <ThemeIcon className={clsx('text-inactive dark:text-navy', className)}>
      <span
        style={{ fontFamily: 'PlemolJP Icons' }}
      >
        
      </span>
    </ThemeIcon>
  );
};
