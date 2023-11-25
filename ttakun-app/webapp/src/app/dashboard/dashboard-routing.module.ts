import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';
import { LoggedInGuard } from '../core/guards/logged-in.guard';
import { DashboardComponent } from './dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';

const dashboardRoutes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [ LoggedInGuard ],canDeactivate: [CanDeactivateGuard], children: [
    { path: '', redirectTo: 'home' },
    { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'settings', loadChildren: () => import('./setting/setting.module').then(m => m.SettingModule) },
    { path: '404', component: NotFoundComponent },
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ]
})
export class DashboardRoutingModule { }
