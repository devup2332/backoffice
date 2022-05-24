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
export class VerificationCodeGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const sessionData = JSON.parse(localStorage.getItem('SESSION_MFA_AUTH')!);

    const pass = sessionData?.mfaAuth ? true : false;

    if (!pass) {
      this.router.navigate(['signin']);
      return false;
    }

    return true;
  }
}
