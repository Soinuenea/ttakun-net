import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { notFoundRoute } from '../config/routes.config';
import { ErrorApiService } from '../services/api/error-api.service';
import { MESSAGE } from './route-error';

const isRouterError = (error) => (error && error.rejection && error.rejection.message === MESSAGE);

@Injectable()
export class AppErrorHandler implements ErrorHandler {
  private router: Router;
  private zone: NgZone;
  private errorApiService: ErrorApiService;

  constructor(
    private injector: Injector
  ) { }

  async handleError(error: any) {
    this.getDependencies();
    if (isRouterError(error)) {
      this.zone.run(() => this.router.navigateByUrl(notFoundRoute));
      return;
    }

    if (environment.printConsoleError) {
      console.error(error); // eslint-disable-line no-console
    }

    await this.errorApiService.save(error.message).toPromise();
    throw error;
  }

  private getDependencies() {
    if (!this.router) {
      this.router = this.injector.get(Router);
    }
    if (!this.zone) {
      this.zone = this.injector.get(NgZone);
    }
    if (!this.errorApiService) {
      this.errorApiService = this.injector.get(ErrorApiService);
    }
  }
}
