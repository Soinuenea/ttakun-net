import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HEADER_PENDING_BLOCKING, HEADER_PENDING_NO_BLOCKING } from '../headers';
import { PendingService } from '../pending.service';

const isUpdatingRequest = (method: string) => {
  return (method === 'POST' || method === 'PUT' || method === 'DELETE');
};

const isBlockingRequest = (req: HttpRequest<any>) => {
  return (
    (isUpdatingRequest(req.method) && !req.headers.has(HEADER_PENDING_NO_BLOCKING))
    || req.headers.has(HEADER_PENDING_BLOCKING)
  );
};

@Injectable()
export class PendingInterceptor implements HttpInterceptor {
  private pendingService: PendingService;
  constructor(
    private inj: Injector
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadPendingService();
    this.start(req);
    return next.handle(req)
      .pipe(
        finalize(this.end(req))
      );
  }

  private start(req: HttpRequest<any>) {
    if (isBlockingRequest(req)) {
      this.pendingService.showBlockingPending();
    } else {
      this.pendingService.addPending();
    }
  }

  private end = (req: HttpRequest<any>) => () => {
    if (isBlockingRequest(req)) {
      this.pendingService.hideBlockingPending();
    } else {
      this.pendingService.removePending();
    }

    return req;
  };

  private loadPendingService() {
    if (!this.pendingService) {
      this.pendingService = this.inj.get(PendingService);
    }
  }
}
