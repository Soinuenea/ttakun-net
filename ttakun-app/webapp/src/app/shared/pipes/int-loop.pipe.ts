import { Pipe, PipeTransform } from '@angular/core';
import { intArray } from '../../core/utils/collection.utils';

@Pipe({
  name: 'intLoop'
})
export class IntLoopPipe implements PipeTransform {
  transform(value: number, ..._args): number[] {
    return intArray(value);
  }
}
