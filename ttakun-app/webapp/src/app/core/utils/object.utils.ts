import * as R from 'ramda';

export const equals = R.curry((a: any, b: any) => a === b);

export const isNullOrUndefined = (object: any) => object === undefined || object === null;

export const isEmpty = (object: any) => isNullOrUndefined(object) || Object.keys(object).length === 0;

export const isNotEmpty = (object: any) => !isEmpty(object);

export const parse = (value: string) => (isNullOrUndefined(value)) ? null : JSON.parse(value);

export const getObjectWithValue = (key: string, value: any) => {
  const obj = {};
  obj[key] = value;

  return obj;
};

export const keys = (object: any) => isNotEmpty(object) ? Object.keys(object) : [];

export const values = (object: any) => keys(object).map(key => object[key]);
