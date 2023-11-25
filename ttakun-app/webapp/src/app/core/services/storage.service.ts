const sessionKey = 'session';
const collapseKey = 'collapse';
const languageCodeKey = 'language';

export const setItem = (key: string, value: any): void => localStorage.setItem(key, JSON.stringify(value));

export const getItem = (key: string): any => {
  const value = localStorage.getItem(key);

  return (value) ? JSON.parse(value) : null;
};

export const setSession = (session): void => {
  setItem(sessionKey, session);
};

export const getSession = (): any => {
  return getItem(sessionKey);
};

export const deleteSession = (): void => {
  setSession(null);
};

export const setCollapse = (collapse: boolean): void => {
  setItem(collapseKey, collapse);
};

export const getCollapse = (): boolean => {
  return getItem(collapseKey);
};

export const deleteCollapse = (): void => {
  setSession(null);
};

export const setLanguageCode = (languageCode: string): void => {
  setItem(languageCodeKey, languageCode);
};

export const getLanguageCode = (): string => {
  return getItem(languageCodeKey);
};

export const deleteLanguageCode = (): void => {
  setSession(null);
};
