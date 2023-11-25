import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarMusicianItemComponent } from './sidebar/sidebar-musician-item/sidebar-musician-item.component';
import { SidebarPlankItemComponent } from './sidebar/sidebar-plank-item/sidebar-plank-item.component';
import { SidebarHeaderComponent } from './sidebar/sidebar-header/sidebar-header.component';
import { SidebarPlayerComponent } from './sidebar/sidebar-player/sidebar-player.component';
import { SidebarFooterComponent } from './sidebar/sidebar-footer/sidebar-footer.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SidebarAddPlankComponent } from './sidebar/sidebar-add-plank/sidebar-add-plank.component';
import { SidebarAddPlankFormComponent } from './sidebar/sidebar-add-plank/sidebar-add-plank-form/sidebar-add-plank-form.component';
import { ColorPickerModule } from 'ngx-color-picker';
// eslint-disable-next-line max-len
import { SidebarPlayerObservationsComponent } from './sidebar/sidebar-player/sidebar-player-observations/sidebar-player-observations.component';
import { SidebarAddMusicianComponent } from './sidebar/sidebar-add-musician/sidebar-add-musician.component';
// eslint-disable-next-line max-len
import { SidebarAddMusicianFormComponent } from './sidebar/sidebar-add-musician/sidebar-add-musician-form/sidebar-add-musician-form.component';
import { CollapseService } from '../core/services/visual/collapse.service';
import { SavePentagramComponent } from './footer/save-pentagram/save-pentagram.component';
import { SavePentagramFormComponent } from './footer/save-pentagram/save-pentagram-form/save-pentagram-form.component';
import { LoadPentagramComponent } from './footer/load-pentagram/load-pentagram.component';
import { LoadPentagramFormComponent } from './footer/load-pentagram/load-pentagram-form/load-pentagram-form.component';
import { ExitModalComponent } from './exit-modal/exit-modal.component';
import { ImportPentagramComponent } from './footer/import-pentagram/import-pentagram.component';
import { ImportPentagramFormComponent } from './footer/import-pentagram/import-pentagram-form/import-pentagram-form.component';

@NgModule({
  declarations: [
    DashboardComponent,
    NotFoundComponent,
    SidebarComponent,
    SpinnerComponent,
    FooterComponent,
    SidebarMusicianItemComponent,
    SidebarPlankItemComponent,
    SidebarHeaderComponent,
    SidebarPlayerComponent,
    SidebarFooterComponent,
    SidebarAddPlankComponent,
    SidebarAddPlankFormComponent,
    SidebarPlayerObservationsComponent,
    SidebarAddMusicianComponent,
    SidebarAddMusicianFormComponent,
    SavePentagramComponent,
    SavePentagramFormComponent,
    LoadPentagramComponent,
    LoadPentagramFormComponent,
    ImportPentagramComponent,
    ImportPentagramFormComponent,
    ExitModalComponent,
  ],
  imports: [
    DashboardRoutingModule,
    DragDropModule,
    SharedModule,
    ColorPickerModule
  ],
  providers: [
    CollapseService,
  ]
})
export class DashboardModule { }
