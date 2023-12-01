import { NgModule } from '@angular/core';
import { NoPreloading, PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PRELOAD_MODULES } from './core/config/constants';
import { routerErrorHandler } from './core/factories/router-error-handler.factory';

const appRoutes: Routes = [
  { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
];

const preloadingStrategy = (PRELOAD_MODULES) ? PreloadAllModules : NoPreloading;

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { errorHandler: routerErrorHandler, preloadingStrategy, relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
