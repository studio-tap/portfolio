import React from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header = (): React.ReactElement => {
  return (
    <header className="flex justify-end p-4">
      <ThemeSwitcher />
    </header>
  );
};
