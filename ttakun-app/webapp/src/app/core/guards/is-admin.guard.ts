import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/index';
import { defaultUserRoute } from '../config/routes.config';
import { hasAdminRole } from '../utils/jwt.utils';

@Injectable()
export class IsAdminGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router
  ) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkRoleAdmin();
  }

  canLoad(
    _route: Route
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkRoleAdmin();
  }

  private checkRoleAdmin() {
    if (hasAdminRole()) {
      return true;
    } else {
      this.router.navigateByUrl(defaultUserRoute);

      return false;
    }
  }
}
