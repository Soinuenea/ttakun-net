import { Pipe, PipeTransform } from '@angular/core';
import { calculateDayDifferenceBetweenMillis } from '../../core/utils/date.utils';

@Pipe({
  name: 'dayDiff'
})
export class DayDiffPipe implements PipeTransform {
  transform(value: number | Date | string, reference: number | Date | string, ..._args): any {
    const diff = calculateDayDifferenceBetweenMillis(value, reference);

    return (diff) ? (diff > 0) ? `+${ diff }` : diff : '';
  }
}
