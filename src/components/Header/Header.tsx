'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ThemeSwitcher } from './ThemeSwitcher';
import { HeaderNav } from './HeaderNav';
import { HamburgerIcon } from '@/components/icons/HamburgerIcon';
import { Typography } from '@/components/Typography/Typography';
import logoBlack from '@/public/logo/logo-black.png';
import logoWhite from '@/public/logo/logo-white.png';
import { BaseLink } from '@/components/Link/BaseLink';
import { ExternalLink } from '@/components/Link/ExternalLink';

export const Header = (): React.ReactElement => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // ページ遷移完了時にメニューを閉じる
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg">
        <div className="relative flex justify-between items-center px-2 py-4 sp:py-6 border-b-2 border-foreground-light dark:border-foreground-dark">
          {/* Left */}
          <Link href="/" className="flex items-center gap-1">
            <div className="relative w-6 h-6">
              <Image
                src={logoBlack}
                alt="STUDIO - TAP Logo"
                width={24}
                height={24}
                quality={100}
                priority
                className="absolute inset-0 dark:opacity-0 transition-opacity duration-200"
              />
              <Image
                src={logoWhite}
                alt=""
                width={24}
                height={24}
                quality={100}
                priority
                aria-hidden="true"
                className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-200"
              />
            </div>
            <Typography as="h1" variant="logo-text" className="font-bold">
              STUDIO-TAP
            </Typography>
          </Link>

          {/* Center (PC nav) */}
          <div className="hidden sp:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <HeaderNav />
          </div>

          {/* Right */}
          <div>
            <div className="hidden sp:block">
              <ThemeSwitcher />
            </div>
            <div className="sp:hidden">
              <HamburgerIcon isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
            </div>
          </div>

        </div>
      </header>

      {/* SP Menu Overlay */}
      {isOpen && (
        <div className="sp:hidden fixed inset-0 bg-background-light dark:bg-background-dark z-40 flex flex-col items-center justify-between py-12">
          {/* Main Navigation */}
          <div className="flex flex-col items-center gap-8 flex-1 justify-center">
            <HeaderNav isMobile />

            {/* Contact Links */}
            <div className="flex flex-col items-center gap-2 mt-4">
              <Typography as="p" variant="body-normal" className='font-light'>
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
            <div className="relative w-6 h-6">
              <Image
                src={logoBlack}
                alt="STUDIO - TAP Logo"
                width={24}
                height={24}
                quality={100}
                className="absolute inset-0 dark:opacity-0 transition-opacity duration-200"
              />
              <Image
                src={logoWhite}
                alt=""
                width={24}
                height={24}
                quality={100}
                aria-hidden="true"
                className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-200"
              />
            </div>
            <Typography as="p" variant="logo-text" className="font-bold">
              STUDIO-TAP
            </Typography>
          </div>
        </div>
      )}
    </>
  );
};