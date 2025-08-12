import React from 'react';
import { Tracking } from './'; // index.tsx から Tracking をインポート

type TrackingMProps = {
  children: React.ReactNode;
  className?: string;
};

export const TrackingM = ({ children, className }: TrackingMProps): React.ReactElement => {
  return (
    <Tracking size="m" className={className}>
      {children}
    </Tracking>
  );
};
