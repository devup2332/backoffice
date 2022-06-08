import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessageComponent } from 'src/app/modules/shared/components/alert-message/alert-message.component';
import { SigninService } from 'src/app/modules/shared/services/signin.service';
import { alertMessages } from 'src/app/modules/shared/utils/messagesAlert';

@Component({
  selector: 'app-forgot-pass-code-verification',
  templateUrl: './forgot-pass-code-verification.component.html',
  styleUrls: ['./forgot-pass-code-verification.component.scss'],
})
export class ForgotPassCodeVerificationComponent implements OnInit {
  timer: any;
  form: FormGroup;
  loading: boolean = false;
  @ViewChild(AlertMessageComponent) _alertComponent: AlertMessageComponent;

  constructor(private _singinSrv: SigninService, private router: Router) {
    this.form = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
        Validators.pattern('^[0-9]+$'),
      ]),
    });
  }

  ngOnInit(): void {
    console.log('HERE');
  }

  changePass() {
    if (this.form.invalid) return;
    const { code } = this.form.value;
    this.loading = true;
    const { username, password } = JSON.parse(
      localStorage.getItem('SANTANDER_FORGOTPASS_DATA')!
    );
    const data = {
      login: username,
      code,
      password,
    };

    this._singinSrv.changePassword(data).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['signin']);
      },
      error: (err) => {
        console.log({ err });
        const { status, error } = err;
        if (status === 200 || status === 201) {
          this.loading = false;
          this.router.navigate(['signin']);
          return;
        }
        this.loading = false;
        if (this.timer) clearTimeout(this.timer);
        this._alertComponent.open = true;
        this._alertComponent.titleMessage = 'Error de autenticación';
        if (status === 409) {
          this._alertComponent.contentMessage = error.error[0].message;
          setTimeout(() => (this._alertComponent.open = false), 5000);
          return;
        }
        this._alertComponent.contentMessage =
          alertMessages.CODE_VERIFICATION_INCORRECT;
        setTimeout(() => (this._alertComponent.open = false), 5000);
      },
    });
  }

  get reqCode() {
    return (
      this.form.get('code')?.hasError('required') &&
      (this.form.get('code')?.touched || this.form.get('code')?.dirty)
    );
  }

  get maxLengthCode() {
    return (
      this.form.get('code')?.hasError('maxlength') ||
      (this.form.get('code')?.hasError('minlength') &&
        (this.form.get('code')?.touched || this.form.get('code')?.dirty))
    );
  }

  get onlyNumbersCode() {
    return this.form.get('code')?.hasError('pattern');
  }
}
