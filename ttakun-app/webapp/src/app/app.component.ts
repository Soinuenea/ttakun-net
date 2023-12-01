import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEu from '@angular/common/locales/eu';
import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  PRIMARY_OUTLET,
  RouteConfigLoadEnd,
  RouteConfigLoadStart,
  Router,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DateTimeAdapter, OWL_DATE_TIME_FORMATS, OwlDateTimeIntl } from 'ng-pick-datetime';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { DATA_BACK_LINK, DATA_TITLE, LANGUAGE_ES, LANGUAGE_EU, PRELOAD_MODULES } from './core/config/constants';
import { createDateFormats } from './core/factories/date-formats.factory';
import { createDateTranslations } from './core/factories/date-translations.factory';
import { PendingService } from './core/services/base/pending.service';
import { TranslationService } from './core/services/translation.service';
import { AppService } from './core/services/visual/app.service';
import { CollapseService } from './core/services/visual/collapse.service';
import { getLanguageCode as getTokenLanguageCode} from './core/utils/jwt.utils';
import { getLanguageCode as getSessionLanguageCode, setLanguageCode} from './core/services/storage.service';

const MIN_WIDTH = 1300;

const getDataAttribute = (route: ActivatedRoute, attributeName: string) => {
  const children: ActivatedRoute[] = route.children;
  for (const child of children) {
    if (child.outlet !== PRIMARY_OUTLET) {
      continue;
    }

    const attribute = getDataAttribute(child, attributeName);
    if (attribute) {
      return attribute;
    }
  }

  return route.snapshot.data[attributeName];
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    // Date config
    { provide: OwlDateTimeIntl, useFactory: createDateTranslations, deps: [ TranslationService ] },
    { provide: OWL_DATE_TIME_FORMATS, useFactory: createDateFormats, deps: [ TranslationService ] },
  ]
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscription: Subscription;
  private narrowWindowSubscription: Subscription;
  private collapsedByWidth = false;

  constructor(
    private collapseService: CollapseService,
    private router: Router,
    private pendingService: PendingService,
    private translate: TranslateService,
    private dateTimeAdapter: DateTimeAdapter<any>,
    private activeRoute: ActivatedRoute,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.initTranslations();
    this.initRouterEvents();
    this.initNarrowWindowSubscription();
    registerLocaleData(localeEs);
    registerLocaleData(localeEu);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.narrowWindowSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.collapseIfNarrowWindow(window.innerWidth);
  }

  @HostListener('window:resize', [ '$event' ])
  onResize(event) {
    this.collapseIfNarrowWindow(event.target.innerWidth);
  }

  private initTranslations = () => {
    const defaultLang = this.getDefaultLanguageCode();
    this.translate.addLangs([LANGUAGE_ES, LANGUAGE_EU]);
    this.translate.setDefaultLang(defaultLang);
    this.translate.use(defaultLang);
    this.dateTimeAdapter.setLocale(defaultLang);
  };

  private getDefaultLanguageCode() {
    const tokenLanguageCode = getTokenLanguageCode();
    const sessionLanguageCode = getSessionLanguageCode();
    if (sessionLanguageCode) {
      return sessionLanguageCode;
    } else {
      setLanguageCode(tokenLanguageCode);
      return tokenLanguageCode;
    }
  }

  private initRouterEvents = () => {
    this.subscription = this.router.events
      .pipe(
        filter(
          (event: Event) => (event instanceof RouteConfigLoadStart
            || event instanceof RouteConfigLoadEnd
            || event instanceof NavigationEnd
          )
        )
      )
      .subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.afterNavigationCompleted();
        } else if (!PRELOAD_MODULES) {
          if (event instanceof RouteConfigLoadStart) {
            this.pendingService.addBlockingPending();
          } else if (event instanceof RouteConfigLoadEnd) {
            this.pendingService.removeBlockingPending();
          }
        }
      });
  };

  private afterNavigationCompleted() {
    const title = getDataAttribute(this.activeRoute.root, DATA_TITLE);
    const backLink = getDataAttribute(this.activeRoute.root, DATA_BACK_LINK);
    this.appService.setTranslatingTitle(title);
    this.appService.setBackLink(backLink);
    window.scrollTo(0, 0);
  }

  private initNarrowWindowSubscription() {
    this.narrowWindowSubscription = this.collapseService.userAction.asObservable()
      .pipe(
        tap(() => this.collapsedByWidth = false)
      ).subscribe();
  }

  private collapseIfNarrowWindow(width) {
    if (width < MIN_WIDTH && !this.collapsedByWidth) {
      this.collapsedByWidth = true;
      this.collapseService.enterFullPage();
    } else if (width >= MIN_WIDTH && this.collapsedByWidth) {
      this.collapseService.exitFullPage();
      this.collapsedByWidth = false;
    }
  }
}
