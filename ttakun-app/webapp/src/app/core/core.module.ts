import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { AppErrorHandler } from './error/app-error.handler';
import { TranslateLocalLoader } from './factories/translate-local-loader';
import { IsAdminGuard } from './guards/is-admin.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { NotLoggedInGuard } from './guards/not-logged-in.guard';
import { AuthApiService } from './services/api/auth-api.service';
import { ErrorApiService } from './services/api/error-api.service';
import { PentagramApiService } from './services/api/pentagram-api.service';
import { SoundApiService } from './services/api/sound-api.service';
import { UserApiService } from './services/api/user-api.service';
import { RefreshTokenService } from './services/authentication/refresh-token.service';
import { EmptyResponseInterceptor } from './services/base/interceptors/empty-response.interceptor';
import { ErrorInterceptor } from './services/base/interceptors/error.interceptor';
import { JwtInterceptor } from './services/base/interceptors/jwt.interceptor';
import { PendingInterceptor } from './services/base/interceptors/pending.interceptor';
import { RefreshTokenInterceptor } from './services/base/interceptors/refresh-token.interceptor';
import { PendingService } from './services/base/pending.service';
import { ResolverService } from './services/base/resolver.service';
import { TranslationService } from './services/translation.service';
import { ValidationService } from './services/validation/validation.service';
import { AppService } from './services/visual/app.service';
import { CollapseService } from './services/visual/collapse.service';
import { ToasterService } from './services/visual/toaster.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelSpeed: 1,
  wheelPropagation: false,
  minScrollbarLength: null
};

@NgModule({
  imports: [
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    PerfectScrollbarModule,
    ToastrModule.forRoot({
      autoDismiss: true,
      maxOpened: 1,
      positionClass: 'toast-top-center',
      preventDuplicates: false,
      timeOut: environment.toasterTimeout
    }),
    TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateLocalLoader }
    })
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    // Interceptors
    { provide: HTTP_INTERCEPTORS, useClass: PendingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: EmptyResponseInterceptor, multi: true },
    // Handlers
    // { provide: ErrorHandler, useClass: AppErrorHandler },
    // Perfect scroll config
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    // Handlers
    { provide: ErrorHandler, useClass: AppErrorHandler },
    // API Services
    AuthApiService,
    ErrorApiService,
    UserApiService,
    SoundApiService,
    PentagramApiService,
    // Services
    AppService,
    CollapseService,
    PendingService,
    RefreshTokenService,
    ResolverService,
    ToasterService,
    TranslationService,
    ValidationService,
    // Guards
    IsAdminGuard,
    LoggedInGuard,
    NotLoggedInGuard
  ]
})
export class CoreModule { }
