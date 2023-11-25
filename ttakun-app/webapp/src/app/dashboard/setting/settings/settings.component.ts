import { Component, OnInit, ViewChild } from '@angular/core';
import { getTheme, setTheme } from '../../../core/services/visual/theme.service';
import { ToasterService } from '../../../core/services/visual/toaster.service';
import { SettingService } from '../setting.service';
import { SettingsPasswordFormComponent } from './settings-password-form/settings-password-form.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentTheme: number;
  passwordErrors: any;
  @ViewChild(SettingsPasswordFormComponent) passwordForm: SettingsPasswordFormComponent;

  constructor(
    private settingService: SettingService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.currentTheme = getTheme();
  }

  async onPasswordChange(data: { password: string; passwordRepeat: string }) {
    try {
      await this.settingService.updatePassword(data.password, data.passwordRepeat);
      this.toasterService.showSuccessTranslating('dashboard.settings.security.success');
      this.passwordForm.reset();
    } catch (errors) {
      this.passwordErrors = errors;
    }
  }

  onThemeChanged(theme: number) {
    setTheme(theme);
  }
}
