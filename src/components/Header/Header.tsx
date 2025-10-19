'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ThemeSwitcher } from './ThemeSwitcher';
import { HeaderNav } from './HeaderNav';
import { HamburgerIcon } from '@/components/icons/HamburgerIcon';
import { Typography } from '@/components/Typography/Typography';
import logoBlack from '@/public/logo/logo-black.png';
import logoWhite from '@/public/logo/logo-white.png';

export const Header = (): React.ReactElement => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg">
        <div className="relative flex justify-between items-center px-2 py-6 border-b-2 border-foreground-light dark:border-foreground-dark">
          {/* Left */}
          <Link href="/" className="flex items-center gap-1">
            {mounted && (
              <Image
                src={theme === 'dark' ? logoWhite : logoBlack}
                alt="STUDIO - TAP Logo"
                width={24} // 1.5rem = 24px
                height={24}
                quality={100}
                priority
              />
            )}
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
        <div className="sp:hidden fixed inset-0 bg-background-light dark:bg-background-dark z-40 flex flex-col items-center justify-center gap-8">
          <HeaderNav />
          <ThemeSwitcher />
        </div>
      )}
    </>
  );
};