import { PercentPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from '../../core/utils/object.utils';

@Pipe({
  name: 'localizedPercent'
})
export class LocalizedPercentPipe implements PipeTransform {
  constructor(private translate: TranslateService) { }

  transform(value: any, digitsInfo?: string, nullText = '-'): any {
    const currentLang = this.translate.currentLang;

    return (!isNullOrUndefined(value)) ? new PercentPipe(currentLang).transform(value, digitsInfo) : nullText;
  }
}
