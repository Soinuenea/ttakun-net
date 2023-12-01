import * as R from 'ramda';
import { isNullOrUndefined } from './object.utils';

export const parseNumber = (value: string) => (isNullOrUndefined(value)) ? null : +value;

export const round = (value: number, decimals = 2) => (!isNullOrUndefined(value)) ? +value.toFixed(decimals) : null;

export const compare = (a: number, b: number) => a - b;

export const getModule = (value: number, max: number, reverse = false) => {
  return (reverse) ? max - (value % max) - 1 : value % max;
};

export const sum = (a: number, b: number) => a + b;

export const isDivisibleBy = R.curry((base: number, value: number) => value % base === 0);

export const isEven = (value: number) => isDivisibleBy(2, value);

export const isNumeric = (value: string) => !isNaN(parseNumber(value));

export const percentage = (value: number, base: number, decimals = 2) => base !== 0 ? round(value * 100 / base, decimals) : null;
