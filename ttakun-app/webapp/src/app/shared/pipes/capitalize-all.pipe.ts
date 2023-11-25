import { Pipe, PipeTransform } from '@angular/core';

import { capitalizeAll } from '../../core/utils/string.utils';

@Pipe({
  name: 'capitalizeAll'
})
export class CapitalizeAllPipe implements PipeTransform {
  transform(value: any): string {
    return capitalizeAll(value);
  }
}
