import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PendingService {
  private blockingPendingCount = 0;
  private pendingCount = 0;
  public isPending = new BehaviorSubject<boolean>(false);
  public isBlockingPending = new BehaviorSubject<boolean>(false);

  addBlockingPending() {
    this.blockingPendingCount += 1;
    this.isBlockingPending.next(true);
  }

  addPending() {
    this.pendingCount += 1;
    this.isPending.next(true);
  }

  hideBlockingPending() {
    this.isBlockingPending.next(false);
  }

  removeBlockingPending() {
    this.blockingPendingCount = (this.blockingPendingCount > 0) ? this.blockingPendingCount - 1 : 0;
    if (this.blockingPendingCount === 0) {
      this.isBlockingPending.next(false);
    }
  }

  removePending() {
    this.pendingCount = (this.pendingCount > 0) ? this.pendingCount - 1 : 0;
    if (this.pendingCount === 0) {
      this.isPending.next(false);
    }
  }

  showBlockingPending() {
    this.isBlockingPending.next(true);
  }
}
