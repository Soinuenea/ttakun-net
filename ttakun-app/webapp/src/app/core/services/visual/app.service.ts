import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { TranslationService } from '../translation.service';

const APP_TITLE = 'Ttakun';

@Injectable()
export class AppService {
  appTitle$ = new BehaviorSubject<string>(null);
  backLink$ = new BehaviorSubject<string>(null);

  constructor(
    private title: Title,
    private translationService: TranslationService
  ) { }

  setTitle(value: string) {
    const title = value ? `${ value }  —  ${ APP_TITLE }` : APP_TITLE;
    this.title.setTitle(title);
    this.appTitle$.next(value);
  }

  async setTranslatingTitle(value: string, params?: { [key: string]: any }) {
    const translation = value ? await this.translationService.getTranslation(value, params) : null;
    this.setTitle(translation);
  }

  setBackLink(url: string) {
    this.backLink$.next(url);
  }
}
