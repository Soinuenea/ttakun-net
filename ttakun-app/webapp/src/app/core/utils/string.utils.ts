import { isNullOrUndefined } from './object.utils';

export const capitalize = (value: string) => {
  return (value) ? value.charAt(0).toUpperCase() + value.slice(1) : value;
};

const reduceCapitalized = (acc: string, word: string) => acc.concat(' ', capitalize(word));

export const capitalizeAll = (value: string) => {
  return (value) ? value.split(' ').reduce(reduceCapitalized, '') : value;
};

export const matches = (haystack: string, needle: string) => {
  const lowHaystack = (haystack) ? haystack.toLowerCase() : '';
  const lowNeedle = (needle) ? needle.toLowerCase() : '';

  return (!lowNeedle || (lowHaystack && lowHaystack.includes(lowNeedle)));
};

export const compare = (a: string, b: string) => a.localeCompare(b);

export const underscore = (value: string) => (value) ? value.replace(' ', '_') : value;

// eslint-disable-next-line @typescript-eslint/ban-types
export const valueOf = (value: Object) => (isNullOrUndefined(value)) ? null : value.toString();

export const isEmpty = (value: string) => isNullOrUndefined(value) || !value.trim();
