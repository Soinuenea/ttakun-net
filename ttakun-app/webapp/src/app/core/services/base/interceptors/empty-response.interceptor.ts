import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class EmptyResponseInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError(
          (err: HttpErrorResponse) => {
            if (err.status >= 200 && err.status < 300) {
              const res = new HttpResponse({
                body: null,
                headers: err.headers,
                status: err.status,
                statusText: err.statusText,
                url: err.url
              });

              return of(res);
            } else {
              return throwError(err);
            }
          }
        )
      );
  }
}
