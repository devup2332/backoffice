import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertMessageComponent } from 'src/app/modules/shared/components/alert-message/alert-message.component';
import { SigninService } from 'src/app/modules/shared/services/signin.service';
import { alertMessages } from 'src/app/modules/shared/utils/messagesAlert';

@Component({
  selector: 'app-choose-rol',
  templateUrl: './choose-rol.component.html',
  styleUrls: ['./choose-rol.component.scss'],
})
export class ChooseRolComponent implements OnInit {
  roles: { code: number; name: string }[] = [];
  branches: { code: number; name: string }[] = [];
  loading: boolean = false;
  openSelectRole: boolean = false;
  openSelectAgency: boolean = false;
  @ViewChild('inputRole') inputRole: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('inputAgency') inputAgency: ElementRef<HTMLDivElement> | undefined;
  @ViewChild(AlertMessageComponent) alertComponent: AlertMessageComponent;
  formChoose: FormGroup;
  timer: any;

  constructor(private _signInService: SigninService, private router: Router) {
    this.formChoose = new FormGroup({
      role: new FormControl('', [Validators.required]),
      agency: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this._signInService.getSantanderData();
    this.roles = this._signInService.roles;
    this.branches = this._signInService.branches;
    document.addEventListener('click', (e) => {
      if (!this.inputRole?.nativeElement?.contains(e.target as Node)) {
        this.openSelectRole = false;
      }
    });
    document.addEventListener('click', (e) => {
      if (!this.inputAgency?.nativeElement?.contains(e.target as Node)) {
        this.openSelectAgency = false;
      }
    });
  }

  changeUser() {
    localStorage.removeItem('SESSION_DATA_SANTANDER');
    localStorage.removeItem('SESSION_SANTANDER');
    localStorage.removeItem('SESSION_MFA_AUTH');
    this.router.navigate(['signin']);
  }

  goToDashboard() {
    this.loading = true;
    const data = {
      role: this.formChoose.get('role')?.value,
      agency: this.formChoose.get('agency')?.value,
      login: JSON.parse(localStorage.getItem('SESSION_DATA_SANTANDER')!).login,
    };

    this._signInService.roleSelection(data).subscribe({
      next: (res: any) => {
        const { accessToken, refreshToken, authorization } =
          res.authenticationResult;
        localStorage.removeItem('SESSION_SANTANDER');
        localStorage.removeItem('SESSION_DATA_SANTANDER');
        localStorage.removeItem('SANTANDER_FORGOTPASS_DATA');
        localStorage.setItem(
          'SANTANDER_TOKEN',
          JSON.stringify({ accessToken, refreshToken, authorization })
        );

        this.loading = false;
        this.router.navigate(['dashboard']);
      },
      error: (err) => {
        this.loading = false;
        const status = err.status;
        if (this.timer) clearTimeout(this.timer);
        this.alertComponent.open = true;
        if (status === 403) {
          this.alertComponent.titleMessage = 'Error de autenticacion';
          this.alertComponent.contentMessage =
            alertMessages.SESSION_ALREADY_IN_USE;
          this.timer = setTimeout(() => {
            this.alertComponent.open = false;
          }, 5000);
          return;
        }
        this.alertComponent.titleMessage = 'Error de autenticacion';
        this.alertComponent.contentMessage = alertMessages.NETWORK_ERROR;
        this.timer = setTimeout(() => {
          this.alertComponent.open = false;
        }, 5000);
      },
    });
  }

  openSelectAgencyMethod() {
    this.openSelectAgency = !this.openSelectAgency;
  }

  openSelectRoleMethod() {
    this.openSelectRole = !this.openSelectRole;
  }
  selectRole(role: { name: string; code: number }) {
    this.formChoose.get('role')?.setValue(role.name);
  }
  selectAgency(branch: { name: string; code: number }) {
    this.formChoose.get('agency')?.setValue(branch.name);
  }

  handleChange(field: string) {
    this.formChoose.get(field)?.setValue('');
  }

  get codeReq() {
    return (
      this.formChoose.get('code')?.hasError('required') &&
      this.formChoose.get('code')?.touched
    );
  }
}
