import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from './modules/dashboard/guards/dashboard.guard';
import { SigninGuard } from './modules/signin/guards/signin/signin.guard';

const routes: Routes = [
  {
    path: 'signin',
    loadChildren: () =>
      import('./modules/signin/signin.module').then((m) => m.SigninModule),
    canActivate: [SigninGuard]
  },  
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
    canActivate: [DashboardGuard]
  },
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'signin',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
