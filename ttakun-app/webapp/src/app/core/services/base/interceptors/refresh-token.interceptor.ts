import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';
import { loginRoute } from '../../../config/routes.config';
import { addAuthHeader } from '../../../utils/request.utils';
import { isUnauthorized } from '../../../utils/response.utils';
import { RefreshTokenService } from '../../authentication/refresh-token.service';
import { deleteSession } from '../../storage.service';
import { HEADER_ANONYMOUS } from '../headers';

const tokenToBeRefreshed = (error, request: HttpRequest<any>) => (
  isUnauthorized(error)
  && !request.headers.has(HEADER_ANONYMOUS)
  && request.url.includes(environment.apiUrl)
);

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  private refreshTokenService: RefreshTokenService;
  private router: Router;
  private refreshTokenInProgress = false;
  private tokenRefreshedSource = new Subject();
  private tokenRefreshed$ = this.tokenRefreshedSource.asObservable();

  constructor(private injector: Injector) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    this.loadRefreshTokenService();
    this.loadRouter();

    // Handle response
    return next.handle(request).pipe(
      catchError(
        error => {
          if (tokenToBeRefreshed(error, request)) {
            return this.refreshToken()
              .pipe(
                switchMap(() => {
                  request = addAuthHeader(request);

                  return next.handle(request);
                }),
                catchError(errorAfterRefresh => {
                  if (isUnauthorized(errorAfterRefresh)) {
                    this.logout();
                  }

                  return throwError(errorAfterRefresh);
                }),
                finalize(() => {
                  this.refreshTokenInProgress = false;
                  this.tokenRefreshedSource.next();
                })
              );
          }

          return throwError(error);
        }
      )
    );
  }

  private refreshToken(): Observable<any> {
    if (this.refreshTokenInProgress) {
      return new Observable(observer => {
        this.tokenRefreshed$.subscribe(() => {
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshTokenInProgress = true;
      return this.refreshTokenService.refreshToken();
    }
  }

  private logout() {
    deleteSession();
    this.router.navigate([loginRoute]);
  }

  private loadRefreshTokenService() {
    if (!this.refreshTokenService) {
      this.refreshTokenService = this.injector.get(RefreshTokenService);
    }
  }

  private loadRouter() {
    if (!this.router) {
      this.router = this.injector.get(Router);
    }
  }
}
