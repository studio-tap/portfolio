'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { ToggleSwitch } from './ToggleSwitch';
import { SunIcon } from '@/components/icons/SunIcon';
import { MoonIcon } from '@/components/icons/MoonIcon';

export const ThemeSwitcher = (): React.ReactElement => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // ハイドレーションエラーを防ぐため、マウントされるまでは何も表示しない
    return <div className="w-[76px]" />; // 仮のスペーサー
  }

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
      />

      <MoonIcon className="text-inactive dark:text-navy" />
    </div>
  );
};
