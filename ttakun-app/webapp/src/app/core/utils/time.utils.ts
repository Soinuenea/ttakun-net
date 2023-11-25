import * as R from 'ramda';
import { parseNumber } from './number.utils';

export interface TimeDetail {
  hours: number;
  minutes: number;
  seconds: number;
}

export const getTimeDetail = (time: number): TimeDetail => {
  const totalSeconds = Math.floor(time / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  return { hours, minutes, seconds };
};

export const getTimeFormat = R.curry((format = '{HOURS}:{MINS}', time: number) => {
  const timeDetail = getTimeDetail(time);

  return format
    .replace('{HOURS}', timeDetail.hours.toString())
    .replace('{MINS}', timeDetail.minutes.toString().padStart(2, '0'))
    .replace('{SECS}', timeDetail.seconds.toString().padStart(2, '0'));
});

export const getTimeMillisFromString = (time: string) => {
  const splittedTime = time.split(':');
  const hours = parseNumber(splittedTime[0]);
  const minutes = parseNumber(splittedTime[1]);
  const seconds = parseNumber(splittedTime[2]);

  return ((hours * 60 + minutes) * 60  + seconds) * 1000;
};

export const getSecondsFromMillis = (millis: number) => millis / 1000;

export const getMinutesFromMillis = (millis: number) => getSecondsFromMillis(millis) / 60;

export const getHoursFromMillis = (millis: number) => getMinutesFromMillis(millis) / 60;
