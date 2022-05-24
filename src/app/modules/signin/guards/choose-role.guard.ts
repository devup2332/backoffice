import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChooseRoleGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const session = localStorage.getItem('SESSION_SANTANDER');
    const { roles, branches } = JSON.parse(
      localStorage.getItem('SESSION_DATA_SANTANDER') || '{}'
    );
    const pass = session && roles && branches ? true : false;
    if (pass) {
      return true;
    }
    this.router.navigateByUrl('signin');
    return false;
  }
}
