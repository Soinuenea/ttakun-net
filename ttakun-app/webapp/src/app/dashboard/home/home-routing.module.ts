import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const homeRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Title' } }
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeRoutingModule { }
