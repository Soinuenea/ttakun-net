import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ToasterService } from '../visual/toaster.service';
import { PendingService } from './pending.service';

@Injectable()
export class ResolverService {

  constructor(
    private router: Router,
    private toasterService: ToasterService,
    private pendingService: PendingService
  ) { }

  onResolverStart = () => this.pendingService.addBlockingPending();

  onResolverStop = () => this.pendingService.removeBlockingPending();

  onResolverError = (route: string, message?: string, result: any = null) => {
    if (message) {
      this.toasterService.showErrorTranslating(message);
    }
    this.router.navigateByUrl(route);

    return of(result);
  };
}
