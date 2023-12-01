import * as R from 'ramda';
import { of } from 'rxjs';

import { compare as compareNumber, isNumeric, parseNumber, sum } from './number.utils';
import { equals, isNullOrUndefined } from './object.utils';
import { compare } from './string.utils';

const compareNumberProperties = R.curry((property: string, reverse: boolean, a: any, b: any) => {
  const reverseFactor = (reverse) ? -1 : 1;

  return reverseFactor * compareNumber(parseNumber(a[property]), parseNumber(b[property]));
});

const compareStringProperties = R.curry((property: string, reverse: boolean, a: any, b: any) => {
  const reverseFactor = (reverse) ? -1 : 1;

  return reverseFactor * compare(a[property], b[property]);
});

const compareStringNumberProperties = R.curry((property: string, reverse: boolean, a: any, b: any) => {
  const bothNumeric = isNumeric(a[property]) && isNumeric(b[property]);

  return (bothNumeric) ? compareNumberProperties(property, reverse, a, b) : compareStringProperties(property, reverse, a, b);
});

export const push = <T>(collection: T[], element: T) => (Array.isArray(collection)) ? [ ...collection, element ] : [ element ];

const accumulateByProperty = R.curry(<T>(property: string, acc: { [key: string]: T[] }, element: T) => (
  { ...acc, [ element[property] ]: push(acc[element[property]], element) }
));

const equalsProperty = R.curry((property: string, value: any, element: any) => {
  return element[property] === value;
});

export const findIndex = <T>(predicate: (element: T) => boolean, collection: T[]) => (Array.isArray(collection))
  ? collection.findIndex(predicate)
  : -1;

const isUniqueInCollectionByProperty = R.curry((property: string, element: any, index: number, collection: any[]) => {
  return findIndex(equalsProperty(property, element[property]), collection) === index;
});

const splitWhenPropertyChanges = R.curry(<T> (property: string, groups: T[][], element: T, index: number, collection: T[]) => {
  let lastGroup = (index === 0 || collection[index - 1][property] !== element[property]) ? [] : groups.pop();
  lastGroup = [ ...lastGroup, element ];

  return [ ...groups, lastGroup ];
});

export const getEmptyAsyncArray = () => of([]);

export const getEmptyAsyncObj = () => of({});

export const filter = R.curry(<T> (predicate: (element: T) => boolean, collection: T[]): T[] => (Array.isArray(collection))
  ? collection.filter(predicate)
  : []);

export const find = R.curry(<T> (predicate: (element: T, i?: number, collection?: T[]) => boolean, collection: T[]): T =>
  (Array.isArray(collection)) ? collection.find(predicate) : null
);

export const sortByProperty = R.curry(<T> (property: string, type: 'string' | 'number', reverse: boolean, collection: T[]) => {
  if (!Array.isArray(collection)) {
    return [];
  }

  switch (type) {
    case 'string': return collection.sort(compareStringProperties(property, reverse));
    case 'number': return collection.sort(compareNumberProperties(property, reverse));
    default: return [];
  }
});

export const sortByNumberOrString = R.curry(<T> (property: string, reverse: string, collection: T[]) => {
  return (Array.isArray(collection)) ? collection.sort(compareStringNumberProperties(property, reverse)) : [];
});

export const sortByNumber = R.curry(<T> (property: string, collection: T[]) => sortByProperty(property, 'number', false, collection));

export const sortByNumberReversed = R.curry(<T> (property: string, collection: T[]) =>
  sortByProperty(property, 'number', true, collection));

export const sortByString = R.curry(<T> (property: string, collection: T[]) => sortByProperty(property, 'string', false, collection));

export const findElementByPropertyValue = (elements: any[], property: string, value: any) => (Array.isArray(elements))
  ? elements.find((element) => element[property] === value)
  : null;

export const groupByProperty = R.curry(<T>(property: string, collection: T[]): { [key: string]: T[]} => {
  return (Array.isArray(collection))
    ? collection.reduce(accumulateByProperty(property), {})
    : {};
});

export const unique = <T> (collection: T[]) => Array.from(new Set(collection));

export const uniqueByProperty = R.curry(<T>(property: string, collection: T[]) => {
  return filter(isUniqueInCollectionByProperty(property), collection);
});

export const sumUpValues = (values: number[]) => (Array.isArray(values)) ? values.reduce(sum, 0) : null;

export const mapCollection = <T> (mapFunction: (element: T, i?: number, array?: T[]) => any, collection: T[]) =>
  (Array.isArray(collection)) ? collection.map(mapFunction) : [];

export const groupOnPropertyChange = R.curry(<T> (property: string, collection: T[]) => {
  return (Array.isArray(collection))
    ? collection.reduce(splitWhenPropertyChanges(property), [])
    : [];
});

export const intArray = (value: number) => Array.from({ length: value }, (_v, k) => k);

export const length = <T> (collection: T[]) => (!isNullOrUndefined(collection) && Array.isArray(collection))
  ? collection.length
  : 0;

export const first = <T> (collection: T[]): T => (length(collection)) ? [ ...collection].shift() : null;

export const last = <T> (collection: T[]): T => (length(collection)) ? [ ...collection].pop() : null;

export const concat = <T> (...collections: T[][]) => (Array.isArray(collections))
  ? collections.reduce((acc: T[], col: T[]) => (Array.isArray(col)) ? [ ...acc, ...col] : [ ...acc ], [])
  : [];

export const isEmpty = <T> (collection: T[]) => !length(collection);

export const reduce = R.curry(
  <T, V> (reductionFunction: (reduced: V, element: T) => V, initialValue: V, collection: T[]) => (Array.isArray(collection))
    ? collection.reduce(reductionFunction, initialValue)
    : null
);

export const merge = <T> (a: T[], b: T[]) => (Array.isArray(a) && Array.isArray(b))
  ? [ ...a, ...b ]
  : (Array.isArray(a))
    ? [ ...a ]
    : (Array.isArray(b))
      ? [ ...b ]
      : [];

export const moveToIndex  = <T> (collection: T[], element: T, indexTo: number) => {
  const replacedCollection = (Array.isArray(collection)) ? [ ...collection ] : [];
  const indexFrom = findIndex(equals(element), replacedCollection);
  if (indexFrom > -1 && indexTo > -1 && indexTo < collection.length) {
    replacedCollection.splice(indexFrom, 1);
    replacedCollection.splice(indexTo, 0, element);
  }

  return replacedCollection;
};

const addMapEntryByValue = R.curry(
  <T> (property: string, acc: { [key: string]: T }, element: T) => {
    const propertyValue = element[property];
    if (propertyValue) {
      acc[propertyValue.toString()] = element;
    }

    return acc;
  }
);

export const mapByProperty = R.curry(<T> (property: string, collection: T[]) => {
  return (Array.isArray(collection)) ? reduce(addMapEntryByValue(property), {}, collection) : {};
});

export const allEqual = <T> (collection: T[]) => Array.isArray(collection)
  ? collection.every( (element, i, arr) => element === arr[0])
  : false;

export const limit = <T> (count: number, collection: T[]): T[] => Array.isArray(collection) ? collection.slice(0, count) : [];

export const removeAtIndex = <T> (index: number, collection: T[]): T[] => filter((_, idx: number) => idx !== index, collection);

export const removeFromCollection = <T> (element: T, collection: T[]): T[] => {
  const index = findIndex(equals(element), collection);
  if (index > -1) {
    return removeAtIndex(index, collection);
  }

  return collection;
};

export const existsIndex = <T> (index: number, collection: T[]): boolean => index > -1 && index < length(collection);

export const flatten = <T> (collection: T[], property: string) => {
  const flattenFn = (list: T[], element: T) => [ ...list, element, ...flatten(element[property], property) ];

  return isEmpty(collection) ? [] : reduce(flattenFn, [], collection);
};
