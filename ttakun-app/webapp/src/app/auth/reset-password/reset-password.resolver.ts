import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class ResetPasswordResolver implements Resolve<boolean> {
  constructor(
    private authService: AuthService
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const hash = route.params['hash'];
    return this.authService.resolveResetPassword(hash);
  }
}
