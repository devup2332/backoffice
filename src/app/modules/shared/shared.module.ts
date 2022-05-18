import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoEyeComponent } from './components/icons/no-eye/no-eye.component';
import { EyeComponent } from './components/icons/eye/eye.component';
import { CheckComponent } from './components/icons/check/check.component';
import { ArrowIconComponent } from './components/icons/arrow-icon/arrow-icon.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersSantanderInterceptor } from './interceptors/headers-santander.interceptor';
import { SigninService } from './services/signin.service';
import { LoadingComponent } from './components/icons/loading/loading.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { CloseIconComponent } from './components/icons/close-icon/close-icon.component';

@NgModule({
  declarations: [
    NoEyeComponent,
    EyeComponent,
    CheckComponent,
    ArrowIconComponent,
    ArrowIconComponent,
    LoadingComponent,
    AlertMessageComponent,
    CloseIconComponent,
  ],
  imports: [CommonModule, HttpClientModule],
  exports: [
    NoEyeComponent,
    EyeComponent,
    CheckComponent,
    ArrowIconComponent,
    LoadingComponent,
    AlertMessageComponent,
    CloseIconComponent,
  ],
  providers: [
    SigninService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HeadersSantanderInterceptor,
      multi: true,
    },
  ],
})
export class SharedModule {}
