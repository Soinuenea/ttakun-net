import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RecoverPasswordDoneComponent } from './recover-password/recover-password-done/recover-password-done.component';
import { RecoverPasswordFormComponent } from './recover-password/recover-password-form/recover-password-form.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ResetPasswordDoneComponent } from './reset-password/reset-password-done/reset-password-done.component';
import { ResetPasswordFormComponent } from './reset-password/reset-password-form/reset-password-form.component';
import { ResetPasswordInvalidComponent } from './reset-password/reset-password-invalid/reset-password-invalid.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordResolver } from './reset-password/reset-password.resolver';
import { RegisterComponent } from './register/register.component';
import { RegisterFormComponent } from './register/register-form/register-form.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    LoginFormComponent,
    LogoutComponent,
    RecoverPasswordComponent,
    RecoverPasswordDoneComponent,
    RecoverPasswordFormComponent,
    ResetPasswordComponent,
    ResetPasswordFormComponent,
    ResetPasswordDoneComponent,
    ResetPasswordInvalidComponent,
    RegisterComponent,
    RegisterFormComponent,
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ],
  providers: [
    // Services,
    AuthService,
    // Providers
    ResetPasswordResolver
  ]
})
export class AuthModule { }
