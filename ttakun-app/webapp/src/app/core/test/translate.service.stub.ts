import { EMPTY, of } from 'rxjs';

export class TranslateServiceStub {
  get(key: any) {
    return of(key);
  }

  get onTranslationChange() {
    return EMPTY;
  }

  get onLangChange() {
    return EMPTY;
  }

  get onDefaultLangChange() {
    return EMPTY;
  }
}
