import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessageComponent } from 'src/app/modules/shared/components/alert-message/alert-message.component';
import { SigninService } from 'src/app/modules/shared/services/signin.service';
import { alertMessages } from 'src/app/modules/shared/utils/messagesAlert';

@Component({
  selector: 'app-verification-code',
  templateUrl: './verification-code.component.html',
  styleUrls: ['./verification-code.component.scss'],
})
export class VerificationCodeComponent implements OnInit {
  verificationCodeForm: FormGroup;
  timer: any;
  loading: boolean = false;
  @ViewChild(AlertMessageComponent) alertComponent: AlertMessageComponent;

  constructor(private _signinService: SigninService, private router: Router) {
    this.verificationCodeForm = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
        Validators.pattern('^[0-9]+$'),
      ]),
    });
  }

  ngOnInit(): void {}

  loginWithCode() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.loading = true;
    const { code } = this.verificationCodeForm.value;
    this._signinService.authenticateUserMfa(code).subscribe({
      next: (res: any) => {
        const { roles, branches, login } = res.official;
        const { session } = res;
        localStorage.setItem(
          'SESSION_DATA_SANTANDER',
          JSON.stringify({ roles, branches, login })
        );
        localStorage.removeItem('SESSION_MFA_AUTH');
        localStorage.setItem('SESSION_SANTANDER', session);
        this.loading = false;
        this.router.navigate(['signin', 'choose-rol']);
      },
      error: (err) => {
        const code = err.status;
        this.alertComponent.open = true;
        if (code === 403) {
          this.alertComponent.titleMessage = 'Error de verificacion';
          this.alertComponent.contentMessage =
            alertMessages.CODE_VERIFICATION_INCORRECT;
        }
        this.timer = setTimeout(() => {
          this.alertComponent.open = false;
        }, 5000);
        this.loading = false;
      },
    });
  }

  changeUser() {
    localStorage.removeItem('SESSION_DATA_SANTANDER');
    localStorage.removeItem('SESSION_SANTANDER');
    localStorage.removeItem('SESSION_MFA_AUTH');
    this.router.navigate(['signin']);
  }

  get reqCode() {
    return (
      this.verificationCodeForm.get('code')?.hasError('required') &&
      (this.verificationCodeForm.get('code')?.touched ||
        this.verificationCodeForm.get('code')?.dirty)
    );
  }

  get maxLengthCode() {
    return (
      this.verificationCodeForm.get('code')?.hasError('maxlength') &&
      this.verificationCodeForm.get('code')?.hasError('minlength')
    );
  }

  get onlyNumbersCode() {
    return this.verificationCodeForm.get('code')?.hasError('pattern');
  }
}
