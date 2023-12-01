import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedCurrency'
})
export class LocalizedCurrencyPipe implements PipeTransform {
  constructor(private translate: TranslateService) { }

  transform(
    value: any,
    currencyCode: string = 'EUR',
    display?: 'code' | 'symbol' | 'symbol-narrow' | string | boolean,
    digitsInfo?: string
  ): any {
    const currentLang = this.translate.currentLang;

    return (value) ? new CurrencyPipe(currentLang).transform(value, currencyCode, display, digitsInfo) : null;
  }
}
