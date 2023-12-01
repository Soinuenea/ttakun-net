import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TranslationService {
  constructor(
    private translateService: TranslateService
  ) { }

  async getTranslation(key: string, params?: { [key: string]: any}) {
    return await this.translateService.get(key, params).toPromise();
  }

  getTranslationSync(key: string, params?: { [key: string]: any}) {
    return this.translateService.instant(key, params);
  }
}
