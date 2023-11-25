import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { loginRoute } from '../../core/config/routes.config';
import { ToasterService } from '../../core/services/visual/toaster.service';
import { AuthService } from '../auth.service';
import { ResetPasswordInterface } from './reset-password.interface';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  hash: string;
  resetPassword$: Observable<boolean>;
  done = false;
  fieldErrors: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.hash = this.activeRoute.snapshot.params['hash'];
    this.resetPassword$ = this.activeRoute.data.pipe(pluck('resetPassword'));
  }

  async onResetPassword(resetPassword: ResetPasswordInterface) {
    this.fieldErrors = null;
    try {
      await this.authService.resetPassword(this.hash, resetPassword.password, resetPassword.repeatPassword);
      this.toasterService.showSuccessTranslating('auth.resetPassword.success');
      this.router.navigateByUrl(loginRoute);
    } catch (errors) {
      this.fieldErrors = errors;
      this.toasterService.showErrorTranslating('auth.resetPassword.error');
    }
  }
}
