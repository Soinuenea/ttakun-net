import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { loggedInRoute } from '../config/routes.config';
import { getSession } from '../services/storage.service';

@Injectable()
export class NotLoggedInGuard implements CanActivate {
  constructor(
    private router: Router
  ) { }

  canActivate(
    _route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const session = getSession();
    if (!!session && !!session.token) {
      this.router.navigateByUrl(loggedInRoute);
      return false;
    }

    return true;
  }
}
