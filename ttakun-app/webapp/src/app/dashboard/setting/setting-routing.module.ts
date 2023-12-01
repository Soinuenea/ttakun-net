import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DATA_TITLE } from '../../core/config/constants';
import { getObjectWithValue } from '../../core/utils/object.utils';
import { SettingsComponent } from './settings/settings.component';

const settingRoutes: Routes = [
  { path: '', component: SettingsComponent, data: getObjectWithValue(DATA_TITLE, 'dashboard.settings.title') }
];

@NgModule({
  imports: [
    RouterModule.forChild(settingRoutes)
  ],
})
export class SettingRoutingModule { }
