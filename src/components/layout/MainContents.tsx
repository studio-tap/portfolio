import React from 'react';

type MainContentsProps = {
  children: React.ReactNode;
};

export const MainContents = ({ children }: MainContentsProps): React.ReactElement => {
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8">
      {children}
    </div>
  );
};
