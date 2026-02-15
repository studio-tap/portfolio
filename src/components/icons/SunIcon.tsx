import { clsx } from 'clsx';
import React from 'react';

import { ThemeIcon } from './ThemeIcon';

type SunIconProps = {
  className?: string;
};

export const SunIcon = ({ className }: SunIconProps): React.ReactElement => {
  return (
    <ThemeIcon className={clsx('text-orange dark:text-inactive', className)}>
      <span
        style={{ fontFamily: 'PlemolJP Icons' }}
      >
        
      </span>
    </ThemeIcon>
  );
};
