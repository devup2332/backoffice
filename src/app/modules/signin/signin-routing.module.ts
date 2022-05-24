import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseRolComponent } from './components/choose-rol/choose-rol.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerificationCodeComponent } from './components/verification-code/verification-code.component';
import { ChooseRoleGuard } from './guards/choose-role.guard';
import { VerificationCodeGuard } from './guards/verification-code.guard';
import { SigninComponent } from './signin.component';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
  },
  {
    path: 'choose-rol',
    component: ChooseRolComponent,
    canActivate: [ChooseRoleGuard],
  },
  {
    path: 'verification-code',
    component: VerificationCodeComponent,
    canActivate: [VerificationCodeGuard],
  },
  {
    path: 'forgotpass',
    component: ForgotPasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigninRoutingModule {}
