import { Pipe, PipeTransform } from '@angular/core';
import { sortByProperty } from '../../core/utils/collection.utils';
import { SortInterface } from '../components/sort-control/sort.interface';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  transform(value: any[], sort: SortInterface, disabled: boolean = false): any[] {
    if (disabled) {
      return value;
    }

    return (sort) ? sortByProperty(sort.attribute, sort.type, sort.reverse, value) : [];
  }
}
