'use client';

import { useState } from 'react';

import { BsMoonFill, BsSunFill } from 'react-icons/bs';

const theme = {
  light: 'light',
  dark: 'dark',
};

export const ThemeToggle = () => {
  const [mode, setMode] = useState(theme.light);

  const toggleTheme = () => {
    const newMode = mode === theme.light ? theme.dark : theme.light;

    document.documentElement.setAttribute('data-theme', newMode);
    setMode(newMode);
  };

  return (
    <button className="btn btn-ghost btn-sm" onClick={toggleTheme}>
      {mode === theme.light ? <BsMoonFill /> : <BsSunFill />}
    </button>
  );
};
