import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingService } from './setting.service';
import { SettingsPasswordFormComponent } from './settings/settings-password-form/settings-password-form.component';
import { SettingsThemeFormComponent } from './settings/settings-theme-form/settings-theme-form.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsPasswordFormComponent,
    SettingsThemeFormComponent
  ],
  imports: [
    SettingRoutingModule,
    SharedModule
  ],
  providers: [
    SettingService
  ]
})
export class SettingModule { }
