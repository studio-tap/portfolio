"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TrackingM } from '@/components/Tracking/TrackingM';

type HeaderNavigationItemProps = {
  href: string;
  text: string;
};

export const HeaderNavigationItem = ({ href, text }: HeaderNavigationItemProps): React.ReactElement => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`
          font-medium text-[1.5em] p-2 relative group
          ${isActive ? 'font-bold' : 'font-medium'}
        `}
      >
        <TrackingM>
          {text}
        </TrackingM>
        <span
          className={`
            absolute bottom-0 left-1/2 transform -translate-x-1/2
            w-0 h-[2px] bg-current transition-all duration-300 ease-out
            group-hover:w-full
          `}
        ></span>
      </Link>
    </li>
  );
};
