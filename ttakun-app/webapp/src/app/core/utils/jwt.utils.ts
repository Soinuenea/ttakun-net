import { DEFAULT_LANGUAGE } from '../config/constants';
import { ROLE_ADMIN } from '../config/privileges-constants';
import { getSession } from '../services/storage.service';

export const parseJwt = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const decoded = decodeURIComponent(escape(window.atob(base64)));

  return JSON.parse(decoded);
};

const getParsedToken = (): any => {
  const session = getSession();

  return (session) ? parseJwt(session.token) : null;
};

export const getSubject = () => {
  const decoded = getParsedToken() || {};

  return decoded.sub || null;
};

export const getFirstName = () => {
  const decoded = getParsedToken() || {};

  return decoded.firstName || null;
};

export const getLastName = () => {
  const decoded = getParsedToken() || {};

  return decoded.lastName || null;
};

export const getLanguageCode = () => {
  const decoded = getParsedToken() || {};

  return decoded.localeLanguage || DEFAULT_LANGUAGE;
};

export const getFullName = () => {
  const firstName = getFirstName() || '';
  const lastName = getLastName() || '';

  return `${ firstName } ${ lastName }`;
};

const getPrivileges = (): string[] => {
  const decoded = getParsedToken() || {};

  let privileges = [];
  if (decoded && decoded.privileges) {
    privileges = decoded.privileges.split(',');
  }

  return privileges;
};

export const hasPrivilege = (privilege: string) => {
  const privileges = getPrivileges();

  return privileges.includes(privilege);
};

export const hasAdminRole = () => hasPrivilege(ROLE_ADMIN);
