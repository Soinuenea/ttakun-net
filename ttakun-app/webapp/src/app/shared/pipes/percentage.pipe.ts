import { Pipe, PipeTransform } from '@angular/core';
import { round } from '../../core/utils/number.utils';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {
  transform(value: number, total: number, decimals = 0): any {
    return `${ round(value * 100 / total, decimals) }%`;
  }
}
