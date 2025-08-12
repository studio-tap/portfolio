import React from 'react';
import Link from 'next/link';
import { TrackingM } from './Tracking/TrackingM';

type HeaderNavigationItemProps = {
  href: string;
  text: string;
};

export const HeaderNavigationItem = ({ href, text }: HeaderNavigationItemProps): React.ReactElement => {
  return (
    <li>
      <Link href={href} className="font-medium text-[1.5em] p-2">
        <TrackingM>
          {text}
        </TrackingM>
      </Link>
    </li>
  );
};