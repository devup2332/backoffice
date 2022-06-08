import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AlertMessageComponent } from '../shared/components/alert-message/alert-message.component';
import { SigninService } from '../shared/services/signin.service';
import { alertMessages } from '../shared/utils/messagesAlert';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  showPass: boolean = true;
  formLogin: FormGroup;
  rememberUser: boolean = false;
  loading: boolean = false;
  timer: any;
  alertMessageState: {
    value: boolean;
    message: string;
  } = {
    value: false,
    message:
      'Contraseña incorrecta. Luego del tercer intento fallido tu cuenta se bloqueará.',
  };
  @ViewChild(AlertMessageComponent) alert: AlertMessageComponent;

  constructor(private router: Router, private _signinService: SigninService) {
    this.formLogin = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  showPassMethod() {
    this.showPass = !this.showPass;
  }
  rememberUserMethod() {
    this.rememberUser = !this.rememberUser;
  }
  loginUser(value: any) {
    this.alertMessageState.value = false;
    this.loading = true;
    if (!this.formLogin.valid)
      return Object.values(this.formLogin.controls).forEach((c) =>
        c.markAsTouched()
      );

    const { username, password } = this.formLogin.value;
    const credentials = { login: username, password: password };
    this._signinService.authenticateUser(credentials).subscribe({
      next: (res: any) => {
        const { session, nextChallenge } = res;
        if (nextChallenge === environment.nextStepsLogin.mpa) {
          localStorage.setItem(
            'SESSION_MFA_AUTH',
            JSON.stringify({ login: credentials.login, session, mfaAuth: true })
          );
          this.loading = false;
          this.router.navigate(['signin', 'verification-code']);
          return;
        }
        const { roles, branches } = res.official as any;
        localStorage.setItem('SESSION_SANTANDER', session);
        localStorage.setItem(
          'SESSION_DATA_SANTANDER',
          JSON.stringify({ roles, branches, login: username })
        );
        this._signinService.branches = branches;
        this._signinService.roles = roles;
        this.loading = false;
        this.router.navigate(['signin', 'choose-rol']);
      },
      error: (err) => {
        this.loading = false;
        const code = err.status;
        if (code === 403) {
          this.alertMessageState.value = true;
          this.alertMessageState.message = alertMessages.PASSWORD_INCORRECT;
          return;
        }
        if (code === 409) {
          this.alertMessageState.value = true;
          this.alertMessageState.message = alertMessages.BLOCKED_ACCOUNT;
          return;
        }
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.alert.open = false;
        }, 3000);
        this.alert.open = true;
        this.alert.titleMessage = 'Error de autenticación';
        this.alert.contentMessage = alertMessages.NETWORK_ERROR;
      },
    });
  }

  get usernameReq() {
    return (
      this.formLogin.get('username')?.hasError('required') &&
      this.formLogin.get('username')?.touched
    );
  }
  get passReq() {
    return (
      this.formLogin.get('password')?.hasError('required') &&
      this.formLogin.get('password')?.touched
    );
  }
}
