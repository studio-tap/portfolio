import React from 'react';
import { ThemeIcon } from './ThemeIcon';

type MoonIconProps = {
  className?: string;
};

export const MoonIcon = ({ className }: MoonIconProps): React.ReactElement => {
  return (
    <ThemeIcon className={className}>
      <span style={{ fontFamily: 'PlemolJP Icons' }}></span>
    </ThemeIcon>
  );
};
