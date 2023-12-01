import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'localizedDate'
})
export class LocalizedDatePipe implements PipeTransform {
  constructor(private translate: TranslateService) { }

  transform(date: any, pattern: string = 'mediumDate', nullText = '-'): any {
    const currentLang = this.translate.currentLang;

    return (date) ? new DatePipe(currentLang).transform(date, pattern) : nullText;
  }

}
