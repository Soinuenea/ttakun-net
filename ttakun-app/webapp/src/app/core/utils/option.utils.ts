import * as R from 'ramda';
import { OptionInterface } from '../models/option.interface';
import { isEmpty, mapCollection, reduce } from './collection.utils';

const getChildren = <T> (childrenField: string | ((any) => T[]), item: any) => (typeof childrenField === 'string')
  ? item[childrenField]
  : childrenField(item);

const getOptionValue = (valueField: string | ((any) => string), item: any) => (typeof valueField === 'string')
  ? item[valueField]
  : valueField(item);

const getOptionLabel = (labelField: string | ((any) => string), item: any) => (typeof labelField === 'string')
  ? item[labelField]
  : labelField(item);

const buildOption = R.curry(
  (valueField: string | ((any) => string), labelField: string | ((any) => string), disabledField: string, item: any): OptionInterface => {
    return {
      value: getOptionValue(valueField, item),
      label: getOptionLabel(labelField, item),
      disabled: (disabledField) ? item[disabledField] : false
    };
  }
);

export const buildOptions =
  (
    collection: any[],
    valueField: string | ((any) => string),
    labelField: string | ((any) => string),
    disabledField: string = null
  ): OptionInterface[] => {
    const buildItemOption = buildOption(valueField, labelField, disabledField);

    return mapCollection((item: any) => buildItemOption(item), collection);
  };

export const buildOptionsAndEmpty =
  (
    collection: any[],
    valueField: string | ((any) => string),
    labelField: string | ((any) => string),
    disabledField: string = null
  ): OptionInterface[] => [
    { value: '', label: '' },
    ...buildOptions(collection, valueField, labelField, disabledField)
  ];

/* eslint-disable @typescript-eslint/no-use-before-define */
const buildNodePathOptions = <T>
  (
    childrenField: string | ((any) => T[]),
    valueField: string | ((any) => string),
    labelField: string | ((any) => string),
    disabledField: string = null,
    path: string = '',
  ) =>
    (collection: OptionInterface[], element: T) => {
      const labelFn = (item: any) => {
        const label  = getOptionLabel(labelField, item);

        return path ? `${ path } > ${ label }` : label;
      };
      const option = buildOption(valueField, labelFn, disabledField, element);
      const children = getChildren(childrenField, element);
      const childrenOptions = buildTreePathOptions(
        children,
        childrenField,
        valueField,
        labelField,
        disabledField,
        option.label
      );

      return [...collection, option, ...childrenOptions];
    };
/* eslint-enable @typescript-eslint/no-use-before-define */

export const buildTreePathOptions = <T>
  (
    collection: T[],
    childrenField: string | ((any) => T[]),
    valueField: string | ((any) => string),
    labelField: string | ((any) => string),
    disabledField: string = null,
    initial: string
  ) => isEmpty(collection)
    ? []
    : reduce(buildNodePathOptions(childrenField, valueField, labelField, disabledField, initial), [], collection);

export const buildTreePathOptionsAndEmpty = <T>
  (
    collection: T[],
    childrenField: string | ((any) => T[]),
    valueField: string | ((any) => string),
    labelField: string | ((any) => string),
    disabledField: string = null,
    initial = ''
  ): OptionInterface[] => [
    { value: '', label: '' },
    ...buildTreePathOptions(collection, childrenField, valueField, labelField, disabledField, initial)
  ];
