import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessageComponent } from '../shared/components/alert-message/alert-message.component';
import { SigninService } from '../shared/services/signin.service';

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
    this.loading = true;
    if (!this.formLogin.valid)
      return Object.values(this.formLogin.controls).forEach((c) =>
        c.markAsTouched()
      );
    const credentials = { login: value.username, password: value.password };
    this._signinService.authenticateUser(credentials).subscribe({
      next: (res: any) => {
        const { session } = res;
        const { roles, branches } = res.official as any;
        this._signinService.roles = roles;
        localStorage.setItem('SESSION_SANTANDER', session);
        localStorage.setItem(
          'SESSION_DATA_SANTANDER',
          JSON.stringify({ roles, branches })
        );
        this._signinService.branches = branches;
        this.loading = false;
        this.router.navigate(['signin', 'choose-rol']);
      },
      error: (err) => {
        console.log({ err });
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.alert.open = false;
        }, 3000);
        this.alert.open = true;
        this.alert.titleMessage = 'Mensaje de Prueba';
        this.loading = false;
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
