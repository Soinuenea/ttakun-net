import { formatNumber } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from '../../core/utils/object.utils';

@Pipe({
  name: 'localizedNumber'
})
export class LocalizedNumberPipe implements PipeTransform {
  constructor(private translate: TranslateService) { }

  transform(value: number, digitsInfo: string = '1.0-2'): any {
    const currentLang = this.translate.currentLang;

    return isNullOrUndefined(value) ? null : formatNumber(value, currentLang, digitsInfo);
  }
}
