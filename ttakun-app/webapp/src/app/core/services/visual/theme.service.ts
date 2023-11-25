import { findElementByPropertyValue } from '../../utils/collection.utils';
import { getItem, setItem } from '../storage.service';

const themeKey = 'theme';
export const THEME_LIGHT = { id: 1, name: 'theme-light' };
export const THEME_DARK = { id: 2, name: 'theme-dark' };
const THEMES = [ THEME_LIGHT, THEME_DARK ];
export const DEFAULT_THEME = THEME_LIGHT.id;

export const setTheme = (theme: number): void => {
  setItem(themeKey, theme);
};

export const getTheme = () => {
  let theme = getItem(themeKey);
  if (!theme) {
    theme = DEFAULT_THEME;
    setTheme(theme);
  }

  return theme;
};

export const getThemeClass = (): string => {
  const themeId = getTheme();
  const theme = findElementByPropertyValue(THEMES, 'id', themeId);

  return theme.name;
};

export const deleteTheme = (): void => {
  setTheme(null);
};

export const isDarkTheme = (name: string) => THEME_DARK.name === name;
