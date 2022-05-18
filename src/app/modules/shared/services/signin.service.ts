import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

interface Credentials {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  uri: string = environment.uriSignIn;
  roles: { code: number; name: string }[] = [];
  branches: { code: number; name: string }[] = [];

  constructor(private http: HttpClient) {}

  authenticateUser(credentials: Credentials) {
    const body = { authentication: credentials };
    return this.http.post(`${this.uri}/users/v1/auth/authentication`, body);
  }
}
