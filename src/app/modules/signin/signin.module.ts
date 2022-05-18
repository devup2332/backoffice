import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChooseRolComponent } from './components/choose-rol/choose-rol.component';
import { SigninRoutingModule } from './signin-routing.module';
import { SigninComponent } from './signin.component';

@NgModule({
  declarations: [SigninComponent, ChooseRolComponent],
  imports: [
    CommonModule,
    SigninRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class SigninModule {}
