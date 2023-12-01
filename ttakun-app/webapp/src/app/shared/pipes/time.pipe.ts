import { Pipe, PipeTransform } from '@angular/core';
import { getTimeFormat } from '../../core/utils/time.utils';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {
  transform(time: number, format: string = '{HOURS}:{MINS}:{SECS}', nullText = '0'): any {
    return (time) ? getTimeFormat(format, time) : nullText;
  }
}
