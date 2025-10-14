"use client";

import React, { useState, useEffect } from 'react';
import { ToggleSwitch } from './ToggleSwitch';
import { SunIcon } from '@/components/icons/SunIcon';
import { MoonIcon } from '@/components/icons/MoonIcon';

export const ThemeSwitcher = (): React.ReactElement => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleToggleChange = (checked: boolean) => {
    setIsDarkMode(checked);
    console.log('Theme toggled to:', checked ? 'dark' : 'light');
  };

  return (
    <div className="flex items-center">
      <SunIcon className="text-orange dark:text-inactive" />

      <ToggleSwitch
        className='mx-1'
        checked={isDarkMode}
        onChange={handleToggleChange}
      />

      <MoonIcon className="text-inactive dark:text-navy" />
    </div>
  );
};
