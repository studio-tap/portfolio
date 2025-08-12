import React from 'react';
import { Tracking } from './'; // index.tsx から Tracking をインポート

type TrackingSProps = {
  children: React.ReactNode;
  className?: string;
};

export const TrackingS = ({ children, className }: TrackingSProps): React.ReactElement => {
  return (
    <Tracking size="s" className={className}>
      {children}
    </Tracking>
  );
};
