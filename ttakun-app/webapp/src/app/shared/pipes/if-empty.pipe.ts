import { Pipe, PipeTransform } from '@angular/core';
import { valueOf } from '../../core/utils/string.utils';

@Pipe({
  name: 'ifEmpty'
})
export class IfEmptyPipe implements PipeTransform {
  transform(value: any, defaultValue: string = '-'): string {
    return value ? valueOf(value) : defaultValue;
  }
}
