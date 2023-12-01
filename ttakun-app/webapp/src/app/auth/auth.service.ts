import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { AuthApiService } from '../core/services/api/auth-api.service';
import { PendingService } from '../core/services/base/pending.service';

@Injectable()
export class AuthService {
  constructor(
    private authApiService: AuthApiService,
    private pendingService: PendingService
  ) { }

  login(email: string, password: string) {
    return this.authApiService.login(email, password).toPromise();
  }

  recoverPassword(email: string) {
    return this.authApiService.recoverPassword(email).toPromise();
  }

  resetPassword(hash: string, password: string, passwordRepeat: string) {
    return this.authApiService.resetPassword(hash, password, passwordRepeat).toPromise();
  }

  resolveResetPassword(hash: string) {
    this.pendingService.addBlockingPending();
    return this.authApiService.checkPasswordRecoveringHash(hash)
      .pipe(
        map(() => true),
        catchError(() => of(false)),
        finalize(() => this.pendingService.removeBlockingPending())
      );
  }

  register(email: string, password: string) {
    return this.authApiService.register(email, password).toPromise();
  }

}
