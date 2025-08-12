import React from 'react';

type TrackingProps = {
  children: React.ReactNode;
  className?: string;
  size?: 's' | 'm' | 'l'; // 新しいsizeプロパティ
};

export const Tracking = ({ children, className, size = 'm' }: TrackingProps): React.ReactElement => {
  const trackingClass = {
    s: 'tracking-[0em]',
    m: 'tracking-[0.025em]',
    l: 'tracking-[0.05em]',
  }[size];

  return (
    <span className={`${trackingClass} ${className}`}>
      {children}
    </span>
  );
};