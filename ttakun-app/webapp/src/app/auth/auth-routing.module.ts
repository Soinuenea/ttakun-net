import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from '../core/guards/logged-in.guard';
import { NotLoggedInGuard } from '../core/guards/not-logged-in.guard';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetPasswordResolver } from './reset-password/reset-password.resolver';
import { RegisterComponent } from './register/register.component';

const authRoutes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      { path: 'login', component: LoginComponent, canActivate: [NotLoggedInGuard] },
      { path: 'register', component: RegisterComponent, canActivate: [NotLoggedInGuard] },
      { path: 'logout', component: LogoutComponent, canActivate: [LoggedInGuard] },
      { path: 'recover-password', component: RecoverPasswordComponent, canActivate: [NotLoggedInGuard] },
      {
        path: 'reset-password/:hash',
        component: ResetPasswordComponent,
        canActivate: [NotLoggedInGuard],
        resolve: { resetPassword: ResetPasswordResolver }
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(authRoutes)
  ]
})
export class AuthRoutingModule { }
