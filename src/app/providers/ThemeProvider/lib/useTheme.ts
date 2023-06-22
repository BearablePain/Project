import { useContext } from 'react';
import { LOCAL_STORAGE_THEME_KEY, Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
  toggleTheme: () => void;
  theme: Theme;
}

const defaultTheme = Theme.LIGHT;

export function useTheme(): UseThemeResult {
  const {
    theme,
    setTheme,
  } = useContext(ThemeContext);

  const toggleTheme = () => {
    const THEME_TOGGLE_MAP = {
      [Theme.DARK]: Theme.LIGHT,
      [Theme.LIGHT]: Theme.ORANGE,
      [Theme.ORANGE]: Theme.DARK,
    };
    const newTheme = theme ? THEME_TOGGLE_MAP[theme] : defaultTheme;
    setTheme?.(newTheme);
    document.body.className = newTheme;
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
}
