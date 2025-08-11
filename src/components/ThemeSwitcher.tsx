"use client";

import React from 'react';
import { ToggleSwitch } from './ToggleSwitch';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

export const ThemeSwitcher = (): React.ReactElement => {
  // ロジックは一時的にコメントアウト
  // const [isDarkMode, setIsDarkMode] = useState(false);
  //
  // useEffect(() => {
  //   if (isDarkMode) {
  //     document.documentElement.classList.add('dark');
  //   } else {
  //     document.documentElement.classList.remove('dark');
  //   }
  // }, [isDarkMode]);
  //
  // const handleToggleChange = (checked: boolean) => {
  //   setIsDarkMode(checked);
  //   console.log('Theme toggled to:', checked ? 'dark' : 'light');
  // };

  return (
    <div className="c-themeSwitcher flex items-center">
      <SunIcon/>

      <ToggleSwitch
        checked={false} // 常にOFFの状態
        onChange={() => {}} // 何もしない
      />

      <MoonIcon/>
    </div>
  );
};
