import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseRolComponent } from './components/choose-rol/choose-rol.component';
import { ChooseRoleGuard } from './guards/choose-role.guard';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SigninRoutingModule {}
