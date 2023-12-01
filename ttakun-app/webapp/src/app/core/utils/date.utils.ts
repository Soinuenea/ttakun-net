import * as moment from 'moment';
import * as R from 'ramda';

export const getCurrentMillis = () => moment().valueOf();

export const getCurrentYear = () => moment().year();

export const getMillis = (date: string | number | Date) => moment(date).valueOf();

export const getMoment = (date: number | string | Date): moment.Moment => moment(date);

export const calculateDayDifferenceBetweenMillis = (from: number | string | Date, to: number | string | Date) => {
  const fromTime = getMoment(from).startOf('day');
  const toTime = getMoment(to).startOf('day');

  return fromTime.diff(toTime, 'days');
};

export const formatMillis = R.curry((format: string, millis: number): string => getMoment(millis).format(format));

export const getFirstMillisOfDateWithCorrection = (date: string | number | Date, hours: number) => (
  moment(date).startOf('date').subtract(hours, 'hour').valueOf()
);

export const getLastMillisOfDateWithCorrection = (date: string | number, hours: number) => (
  moment(date).endOf('date').add(hours, 'hour').valueOf()
);

export const getFirstMillisOfDate = (date: string | number | Date) => (
  getFirstMillisOfDateWithCorrection(date, 0)
);

export const getLastMillisOfDate = (date: string | number) => (
  getLastMillisOfDateWithCorrection(date, 0)
);

export const isSameDay = (date: string | number | Date, otherDate: string | number | Date) => getMoment(date).isSame(otherDate, 'days');

export const getMillisFromStringWithFormat = R.curry((format: string, date: string) => moment(date, format).valueOf());

export const subtractDays = R.curry((days: number, date: string | number | Date) => moment(date).subtract(days, 'days').valueOf());

export const addDays = R.curry((days: number, date: string | number | Date) => moment(date).add(days, 'days').valueOf());

export const addMinutes = R.curry((minutes: number, date: string | number | Date) => moment(date).add(minutes, 'minutes').valueOf());

export const toDate = (date: string | number | Date) => moment(date).toDate();

export const getCurrentDate = () => toDate(getCurrentMillis());

export const getDatesBetweenDates = (start: string | number | Date, end: string | number | Date) => {
  const dates = [];
  for (let date = start; date <= end; date = addDays(1, date)) {
    dates.push(getFirstMillisOfDate(date));
  }

  return dates;
};

export const getLastDateOfYear = (value: any) =>
  value ? moment(value).set({ month: 11, date: 31 }).toDate() : null;

