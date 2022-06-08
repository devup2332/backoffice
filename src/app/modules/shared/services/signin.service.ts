import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { environment } from 'src/environments/environment';

interface Credentials {
  login: string;
  password: string;
}

interface RoleSelectionData {
  agency: string;
  role: string;
  login: string;
}

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  uri: string = environment.uriSignIn;
  roles: { code: number; name: string }[] = [];
  branches: { code: number; name: string }[] = [];
  mfaAuth: boolean = false;

  constructor(private http: HttpClient) {}

  authenticateUser(credentials: Credentials) {
    const body = { authentication: credentials };
    return this.http.post(`${this.uri}/users/v1/auth/authentication`, body);
  }

  authenticateUserMfa(verificationCode: number) {
    const { session, login } = JSON.parse(
      localStorage.getItem('SESSION_MFA_AUTH')!
    );
    const body = {
      session,
      authentication: {
        login,
      },
      verificationCode,
    };

    return this.http.post(
      `${this.uri}/users/v1/auth/authentication/mfa-verification`,
      body
    );
  }

  roleSelection(data: RoleSelectionData) {
    const session = localStorage.getItem('SESSION_SANTANDER');
    const role = this.roles.find((r) => {
      return r.name === data.role;
    });
    const branch = this.branches.find((b) => {
      return b.name === data.agency;
    });
    const body = {
      session: session,
      authentication: {
        login: data.login,
      },
      subsidiary: {
        code: 1,
      },
      branch: {
        code: branch?.code,
      },
      role: {
        code: role?.code,
      },
    };

    return this.http.post(
      `${this.uri}/users/v1/auth/authentication/role-selection`,
      body
    );
  }

  getSantanderData() {
    const { roles, branches, mfaAuth } = JSON.parse(
      localStorage.getItem('SESSION_DATA_SANTANDER')!
    );
    this.roles = roles;
    this.branches = branches;
    this.mfaAuth = mfaAuth;
  }

  sendCodeFortgotPassword(login: string) {
    const body = {
      authentication: {
        login,
      },
    };
    return this.http.post(
      `${environment.uriSignIn}/users/v1/auth/authentication/forgot-password`,
      body
    );
  }

  changePassword({ login, code, password }: any) {
    const body = {
      authentication: {
        login,
      },
      newPassword: password,
      verificationCode: code,
    };
    console.log({ body });
    return this.http.patch(
      `${environment.uriSignIn}/users/v1/auth/authentication/confirm-change-password`,
      body
    );
  }

  checkPasswordEqual(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const pass1 = control.get(controlName)?.value;
      const pass2 = control.get(matchingControlName)?.value;

      return pass1 === pass2 ? null : { notEqual: true };
    };
  }
}
