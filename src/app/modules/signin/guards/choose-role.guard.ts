import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
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
      localStorage.getItem('SESSION_DATA_SANTANDER')!
    );
    const pass = session && roles && branches;
    if (!pass) {
      this.router.navigate(['signin']);
      return false;
    }
    return true;
  }
}
