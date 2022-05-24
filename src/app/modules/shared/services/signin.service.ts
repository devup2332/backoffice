import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

    console.log({ body });

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
}
