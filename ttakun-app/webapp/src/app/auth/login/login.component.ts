import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { loggedInRoute } from '../../core/config/routes.config';
import { ToasterService } from '../../core/services/visual/toaster.service';
import { AuthService } from '../auth.service';
import { LoginInterface } from './login.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  async onLogin(login: LoginInterface) {
    try {
      await this.authService.login(login.email, login.password);
      this.router.navigateByUrl(loggedInRoute);
    } catch (error) {
      this.toasterService.showErrorTranslating('auth.login.error');
    }
  }

}
