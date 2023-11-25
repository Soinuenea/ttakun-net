import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';

declare const require;

export class TranslateLocalLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return of(require(`../../../assets/i18n/${lang}.json`));
  }
}
