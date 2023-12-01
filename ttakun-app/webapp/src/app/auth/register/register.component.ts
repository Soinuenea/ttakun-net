import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { loginRoute } from '../../core/config/routes.config';
import { ToasterService } from '../../core/services/visual/toaster.service';
import { AuthService } from '../auth.service';
import { RegisterInterface } from './register.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  async onRegister(register: RegisterInterface) {
    try {
      await this.authService.register(register.email, register.password);
      this.toasterService.showSuccessTranslating('auth.register.success');
      this.router.navigateByUrl(loginRoute);
    } catch (error) {
      this.toasterService.showErrorTranslating('auth.register.error');
    }
  }
}
