import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {from, Observable} from 'rxjs';
import { Auth } from 'aws-amplify';
import {catchError, switchMap} from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return from(Auth.currentAuthenticatedUser())
      .pipe(
        switchMap((auth: any) => { // switchMap() is used instead of map().

          const jwt = auth.signInUserSession.idToken.jwtToken;
          console.log(jwt);
          // tslint:disable-next-line:variable-name
          const with_auth_request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${jwt}`
            }
          });
          console.log('Cloned', with_auth_request);
          return next.handle(with_auth_request);
        }),
        catchError((err) => {
          console.log('Error ', err);
          return next.handle(request);
        })
      );
  }
}
