import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as uuid from 'uuid';

@Injectable()
export class HeadersSantanderInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const headers = new HttpHeaders({
      'x-end-user-terminal': environment.HEADERS.X_END_USER_TERMINAL,
      'x-api-key': environment.HEADERS.X_API_KEY,
      'x-end-user-login': environment.HEADERS.X_END_USER_LOGIN,
      'x-request-id': uuid.v4(),
      'x-end-user-request-date-time':
        environment.HEADERS.X_END_USER_REQUEST_DATE_TIME,
    });
    const reqModify = request.clone({
      headers,
    });
    return next.handle(reqModify);
  }
}
