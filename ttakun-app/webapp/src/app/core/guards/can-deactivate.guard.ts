import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<DashboardComponent> {

  canDeactivate(component: DashboardComponent): Observable<boolean> {
    let subject = new Subject<boolean>();

    if(component.hasUnsavedData()){
      component.openExitModal();
      subject = component.subject;
      return subject.asObservable();
    }
    return of(true);
  }

}
