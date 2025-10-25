'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeSwitcher } from './ThemeSwitcher';
import { HeaderNav } from './HeaderNav';
import { HeaderLogo } from './HeaderLogo';
import { HamburgerIcon } from '@/components/icons/HamburgerIcon';
import { Typography } from '@/components/Typography/Typography';
import { BaseLink } from '@/components/Link/BaseLink';
import { ExternalLink } from '@/components/Link/ExternalLink';

type Props = {
  currentPath: string;
};

export const Header = ({ currentPath }: Props): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  // ページ遷移完了時にメニューを閉じる
  useEffect(() => {
    setIsOpen(false);
  }, [currentPath]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg">
        <div className="relative flex justify-between items-center px-3 py-3 sp:py-6 border-b-2 border-foreground-light dark:border-foreground-dark">
          {/* Left */}
          <Link href="/" className="flex items-center gap-1">
            <HeaderLogo priority />
            <Typography as="h1" variant="logo-text" className="font-bold">
              STUDIO-TAP
            </Typography>
          </Link>

          {/* Center (PC nav) */}
          <div className="hidden sm:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <HeaderNav currentPath={currentPath} />
          </div>

          {/* Right */}
          <div>
            <div className="hidden sm:block">
              <ThemeSwitcher />
            </div>
            <div className="sm:hidden flex item-center">
              <HamburgerIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            </div>
          </div>

        </div>
      </header>

      {/* SP Menu Overlay */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 bg-background-light dark:bg-background-dark z-40 flex flex-col items-center justify-between py-12">
          {/* Main Navigation */}
          <div className="flex flex-col items-center gap-8 flex-1 justify-center">
            <HeaderNav isMobile currentPath={currentPath} />

            {/* Contact Links */}
            <div className="flex flex-col items-center gap-2 mt-4">
              <Typography as="p" variant="body-normal" className="font-light">
                Email: <BaseLink href="mailto:camphora@studio-tap.com">camphora@studio-tap.com</BaseLink><br />
                Form: <ExternalLink href="https://forms.gle/1iG7xoAD34fJ8hjy5">Google Form</ExternalLink>
              </Typography>
            </div>

            {/* Theme Switcher */}
            <div className="mt-4">
              <ThemeSwitcher />
            </div>
          </div>

          {/* Site Logo & Name */}
          <div className="flex flex-col items-center gap-2">
            <HeaderLogo />
            <Typography as="p" variant="logo-text" className="font-bold">
              STUDIO-TAP
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};