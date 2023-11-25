import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { DragToSelectModule } from 'ngx-drag-to-select';
import { SharedModule } from '../../shared/shared.module';
import { SidebarSoundService } from '../sidebar/sidebar-sound.service';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    HomeRoutingModule,
    SharedModule,
    DragDropModule,
    DragToSelectModule.forRoot({
      selectedClass: 'rectangle-selected'
    }),
  ],
  providers: [
    // SERVICE
    SidebarSoundService,
  ]
})
export class HomeModule { }
