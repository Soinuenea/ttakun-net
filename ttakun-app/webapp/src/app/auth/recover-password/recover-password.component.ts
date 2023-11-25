import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { loginRoute } from '../../core/config/routes.config';
import { ToasterService } from '../../core/services/visual/toaster.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toasterService: ToasterService
  ) { }

  async onRecover(email: string) {
    try {
      await this.authService.recoverPassword(email);
      this.toasterService.showSuccessTranslating('auth.recoverPassword.success');
      this.router.navigateByUrl(loginRoute);
    } catch (error) {
      this.toasterService.showErrorTranslating('auth.recoverPassword.error');
    }
  }

}
