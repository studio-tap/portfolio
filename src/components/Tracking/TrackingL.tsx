import React from 'react';
import { Tracking } from './'; // index.tsx から Tracking をインポート

type TrackingLProps = {
  children: React.ReactNode;
  className?: string;
};

export const TrackingL = ({ children, className }: TrackingLProps): React.ReactElement => {
  return (
    <Tracking size="l" className={className}>
      {children}
    </Tracking>
  );
};
