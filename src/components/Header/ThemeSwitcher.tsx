'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ToggleSwitch } from './ToggleSwitch';
import { SunIcon } from '@/components/icons/SunIcon';
import { MoonIcon } from '@/components/icons/MoonIcon';

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
        className="mx-1"
        checked={isDarkMode}
        onChange={handleToggleChange}
        ariaLabel="ダークモード切り替え"
        disabled={!mounted}
      />

      <MoonIcon className="text-inactive dark:text-navy" />
    </div>
  );
};
