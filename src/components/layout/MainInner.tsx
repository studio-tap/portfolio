import React from 'react';

type MainInnerProps = {
  children: React.ReactNode;
  className?: string;
};

export const MainInner = ({ children, className }: MainInnerProps): React.ReactElement => {
  return (
    <div className={`mx-auto max-w-screen-lg px-3 py-6 ${className}`}>
      {children}
    </div>
  );
};
