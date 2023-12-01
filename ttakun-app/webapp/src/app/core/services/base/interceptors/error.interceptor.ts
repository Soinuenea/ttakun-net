import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ValidationService } from '../../validation/validation.service';
import { HEADER_AVOID_ERROR_HANDLING, HEADER_ERROR_HANDLING, HEADER_ERROR_PREFIX } from '../headers';

const isUpdatingRequest = (method: string) => method === 'POST' || method === 'PUT' || method === 'DELETE';

const areResponseErrorsToBeHandled = (req: HttpRequest<any>) => {
  return (isUpdatingRequest(req.method))
    ? !req.headers.has(HEADER_AVOID_ERROR_HANDLING)
    : req.headers.has(HEADER_ERROR_HANDLING);
};

const getErrorPrefixFromHeaders = (headers: HttpHeaders) => {
  return headers.get(HEADER_ERROR_PREFIX) || null;
};

const decodeArrayBufferError = (error: ArrayBuffer) => JSON.parse(JSON.stringify(error));

const parseError = (err: { [key: string]: string } | ArrayBuffer) => (err instanceof ArrayBuffer) ? decodeArrayBufferError(err) : err;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private validationService: ValidationService;
  constructor(
    private inj: Injector
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadValidationService();
    return next.handle(req)
      .pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse && areResponseErrorsToBeHandled(req)) {
            const error = parseError(err.error);
            const errorPrefix = getErrorPrefixFromHeaders(req.headers);
            return this.validationService.manageHttpResponseErrors(error, errorPrefix);
          }

          return throwError(err);
        })
      );
  }

  private loadValidationService() {
    if (!this.validationService) {
      this.validationService = this.inj.get(ValidationService);
    }
  }
}
