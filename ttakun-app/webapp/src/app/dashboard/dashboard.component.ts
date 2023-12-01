import { Component, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Subject, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';
import { Pentagram } from '../core/models/pentagram';
import { CollapseService } from '../core/services/visual/collapse.service';
import { ExitModalComponent } from './exit-modal/exit-modal.component';
import { PentagramService } from './pentagram.service';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(PerfectScrollbarDirective) main: PerfectScrollbarDirective;
  @ViewChild(SidebarComponent) sidebar: SidebarComponent;
  @ViewChild(ExitModalComponent) exitModal: ExitModalComponent;

  subject = new Subject<boolean>();

  private subscription: Subscription;

  constructor(
    public collapseService: CollapseService,
    public pentagramService: PentagramService,
    public canDeactivateGuard: CanDeactivateGuard,
    private router: Router
  ) { }

  @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {
        if (this.hasUnsavedData()) {
          $event.returnValue =true;
        }
    }
   onWindowClose($event: any): void {
      if (this.hasUnsavedData()) {
        $event.returnValue =true;
      }
    }

  ngOnInit() {
    this.subscription = this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.main.scrollToTop();
      });
  }

  ngOnDestroy() {
    this.pentagramService.updateCurrentPentagram(new Pentagram());
    this.subscription.unsubscribe();
  }

  hasUnsavedData() {
    return this.pentagramService.hasUnsavedData.value;
  }

  openExitModal() {
    this.exitModal.open();
  }

  onConfirmExit(_: any) {
    this.subject.next(true);
  }

  onCancelExit(_: any) {
    this.subject.next(false);
  }

  get onNewWithoutSave() {
    return this.openExitModal.bind(this);
  }

}
