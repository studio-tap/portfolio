import React from 'react';
import { IconBase } from './IconBase';

type ThemeIconProps = {
  children: React.ReactNode; // childrenを受け取るように変更
  className?: string;
  size?: string;
};

export const ThemeIcon = ({ children, className, size }: ThemeIconProps): React.ReactElement => {
  return (
    <IconBase className={`c-themeIcon inline-block w-[2em] p-[0.5em] ${className}`} size={'text-2xl'}>
      {children} {/* iconContentをchildrenに変更 */}
    </IconBase>
  );
};