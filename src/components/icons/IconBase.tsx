import React from 'react';

// 独自Props定義
type IconBaseProps = {
  children: React.ReactNode;
  className?: string;
  size?: string;
};

export const IconBase = ({ children, className, size = 'text-m' }: IconBaseProps): React.ReactElement => {
  return (
    <span className={`${size} leading-none ${className}`}
    >
      {children}
    </span>
  );
};
