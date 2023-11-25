import { BehaviorSubject } from 'rxjs';
import { getCollapse, setCollapse } from '../storage.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CollapseService {
  private storedCollapsed: boolean;
  collapse = new BehaviorSubject(false);
  userAction = new BehaviorSubject<void>(null);
  collapsable = new BehaviorSubject(true);
  fullPage = new BehaviorSubject(false);

  constructor() {
    this.collapse.next(getCollapse() || false);
  }

  get collapse$() {
    return this.collapse.asObservable();
  }

  get collapsable$() {
    return this.collapsable.asObservable();
  }

  get fullPage$() {
    return this.fullPage.asObservable();
  }

  toggleCollapse() {
    const collapse = !this.collapse.getValue();

    this.collapse.next(collapse);
    this.userAction.next(null);
    setCollapse(collapse);
  }

  collapseAndStore() {
    this.storedCollapsed = this.collapse.getValue();
    this.collapse.next(true);
    this.collapsable.next(false);
  }

  restoreCollapsed() {
    this.collapse.next(this.storedCollapsed);
    this.collapsable.next(true);
  }

  enterFullPage() {
    this.fullPage.next(true);
    this.collapseAndStore();
  }

  exitFullPage() {
    this.fullPage.next(false);
    this.restoreCollapsed();
  }
}
