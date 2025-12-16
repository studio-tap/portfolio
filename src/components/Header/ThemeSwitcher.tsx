'use client';

import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';

import { ToggleSwitch } from './ToggleSwitch';

import { MoonIcon } from '@/components/icons/MoonIcon';
import { SunIcon } from '@/components/icons/SunIcon';

export const ThemeSwitcher = (): React.ReactElement => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // SSR時はresolvedThemeがundefinedなので、falseとして扱う
  // これによりSSR時はライトモードの見た目で描画される
  const isDarkMode = resolvedTheme === 'dark';

  const handleToggleChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center">
      <SunIcon className="text-orange dark:text-inactive" />

      <ToggleSwitch
        ariaLabel="ダークモード切り替え"
        checked={isDarkMode}
        className="mx-1"
        disabled={!mounted}
        onChange={handleToggleChange}
      />

      <MoonIcon className="text-inactive dark:text-navy" />
    </div>
  );
};
