import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessageComponent } from 'src/app/modules/shared/components/alert-message/alert-message.component';
import { SigninService } from 'src/app/modules/shared/services/signin.service';
import { alertMessages } from 'src/app/modules/shared/utils/messagesAlert';

const strongPassRex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!=?_=+@#$%^&*])(?=.{8,})/;

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  @ViewChild('iconInfo', { static: true }) iconInfo: ElementRef<HTMLDivElement>;
  @ViewChild(AlertMessageComponent) alertComponent: AlertMessageComponent;
  forgotPassForm: FormGroup;
  timer: any;
  loading: boolean = false;
  showToolTip: boolean = false;
  showPass_1: boolean = true;
  showPass_2: boolean = true;

  constructor(private _signinService: SigninService, private router: Router) {
    this.forgotPassForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        password_1: new FormControl('', [
          Validators.required,
          Validators.pattern(strongPassRex),
          Validators.minLength(8),
        ]),
        password_2: new FormControl('', [Validators.required]),
      },
      {
        validators: [
          this._signinService.checkPasswordEqual('password_1', 'password_2'),
        ],
      }
    );
  }

  ngOnInit(): void {
    this.iconInfo.nativeElement?.addEventListener('mouseenter', () => {
      this.showToolTip = true;
    });
    this.iconInfo.nativeElement?.addEventListener('mouseleave', () => {
      this.showToolTip = false;
    });
  }

  changePass() {
    console.log({ errors: this.forgotPassForm.errors });
    if (this.forgotPassForm.invalid) {
      return Object.values(this.forgotPassForm.controls).forEach((c) => {
        c.markAsTouched();
      });
    }
    this.loading = true;
    const { username, password_1: password } = this.forgotPassForm.value;
    this._signinService.sendCodeFortgotPassword(username).subscribe({
      next: (res: any) => {
        this.loading = false;
        const data = { username, password };
        localStorage.setItem('SANTANDER_FORGOTPASS_DATA', JSON.stringify(data));
        this.router.navigate(['signin', 'forgotpasscode']);
      },
      error: (err) => {
        const { status, error } = err;
        if (this.timer) clearTimeout(this.timer);
        this.alertComponent.open = true;
        this.alertComponent.titleMessage = 'Error de autenticación';
        if (status == 409) {
          this.alertComponent.contentMessage = error.error[0].message;
          this.timer = setTimeout(() => {
            this.alertComponent.open = false;
          }, 5000);
          this.loading = false;
          return;
        }
        this.alertComponent.contentMessage = alertMessages.FORGOT_PASS_ERROR;
        this.timer = setTimeout(() => {
          this.alertComponent.open = false;
        }, 5000);
        this.loading = false;
      },
    });
  }

  showPass1Method() {
    this.showPass_1 = !this.showPass_1;
  }
  showPass2Method() {
    this.showPass_2 = !this.showPass_2;
  }

  get userReq() {
    return (
      this.forgotPassForm.get('username')?.hasError('required') &&
      (this.forgotPassForm.get('username')?.touched ||
        this.forgotPassForm.get('username')?.dirty)
    );
  }
  get passReq() {
    return (
      this.forgotPassForm.get('password_1')?.hasError('required') &&
      (this.forgotPassForm.get('password_1')?.touched ||
        this.forgotPassForm.get('password_1')?.dirty)
    );
  }

  get passNoEqual() {
    return (
      this.forgotPassForm.hasError('notEqual') &&
      (this.forgotPassForm.get('password_1')?.touched ||
        this.forgotPassForm.get('password_1')?.dirty) &&
      (this.forgotPassForm.get('password_2')?.touched ||
        this.forgotPassForm.get('password_2')?.dirty)
    );
  }
  get passToShort() {
    return (
      this.forgotPassForm.get('password_1')?.hasError('minlength') &&
      this.forgotPassForm.get('password_2')?.touched
    );
  }

  get insecurePassword() {
    return (
      this.forgotPassForm.get('password_1')?.hasError('pattern') &&
      this.forgotPassForm.get('password_1')?.touched
    );
  }
}
