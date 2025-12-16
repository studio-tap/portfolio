'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { HeaderLogo } from './HeaderLogo';
import { HeaderNav } from './HeaderNav';
import { ThemeSwitcher } from './ThemeSwitcher';

import { HamburgerIcon } from '@/components/icons/HamburgerIcon';
import { BaseLink } from '@/components/Link/BaseLink';
import { ExternalLink } from '@/components/Link/ExternalLink';
import { Typography } from '@/components/Typography/Typography';

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
      <header className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-lg dark:bg-background-dark/80">
        <div className="relative flex items-center justify-between border-b-2 border-foreground-light px-3 py-3 dark:border-foreground-dark sp:py-6">
          {/* Left */}
          <Link
            className="flex items-center gap-1"
            href="/"
          >
            <HeaderLogo priority />
            <Typography
              as="h1"
              className="font-bold"
              variant="logo-text"
            >
              STUDIO-TAP
            </Typography>
          </Link>

          {/* Center (PC nav) */}
          <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
            <HeaderNav currentPath={currentPath} />
          </div>

          {/* Right */}
          <div>
            <div className="hidden sm:block">
              <ThemeSwitcher />
            </div>
            <div className="item-center flex sm:hidden">
              <HamburgerIcon
                isOpen={isOpen}
                onClick={() => setIsOpen(!isOpen)}
              />
            </div>
          </div>
        </div>
      </header>

      {/* SP Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-between bg-background-light py-12 dark:bg-background-dark sm:hidden">
          {/* Main Navigation */}
          <div className="flex flex-1 flex-col items-center justify-center gap-8">
            <HeaderNav
              currentPath={currentPath}
              isMobile
            />

            {/* Contact Links */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <Typography
                as="p"
                className="font-light"
                variant="body-normal"
              >
                Email: <BaseLink href="mailto:camphora@studio-tap.com">camphora@studio-tap.com</BaseLink>
                <br />
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
            <Typography
              as="p"
              className="font-bold"
              variant="logo-text"
            >
              STUDIO-TAP
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};
