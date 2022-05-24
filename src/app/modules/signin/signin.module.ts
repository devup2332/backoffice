import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChooseRolComponent } from './components/choose-rol/choose-rol.component';
import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerificationCodeComponent } from './components/verification-code/verification-code.component';

@NgModule({
  declarations: [SigninComponent, ChooseRolComponent, ForgotPasswordComponent, VerificationCodeComponent],
  imports: [
    CommonModule,
    SigninRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class SigninModule {}
