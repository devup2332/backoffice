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
import { ExitComponent } from './components/icons/exit/exit.component';
import { IconInfoComponent } from './components/icons/icon-info/icon-info.component';
import { MenuIconComponent } from './components/icons/menu-icon/menu-icon.component';
import { SettingsIconComponent } from './components/icons/settings-icon/settings-icon.component';
import { HomeIconComponent } from './components/icons/home-icon/home-icon.component';
import { LogoutIconComponent } from './components/icons/logout-icon/logout-icon.component';
import { UsersIconComponent } from './components/icons/users-icon/users-icon.component';
import { ExpandIconComponent } from './components/icons/expand-icon/expand-icon.component';

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
    ExitComponent,
    IconInfoComponent,
    MenuIconComponent,
    SettingsIconComponent,
    HomeIconComponent,
    LogoutIconComponent,
    UsersIconComponent,
    ExpandIconComponent,
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
    ExitComponent,
    IconInfoComponent,
    MenuIconComponent,
    HomeIconComponent,
    SettingsIconComponent,
    LogoutIconComponent,
    ExpandIconComponent,
    UsersIconComponent,
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
