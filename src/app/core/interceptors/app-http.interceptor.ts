import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/auth/login')) {
      let newRequest = request.clone({
        headers: request.headers.set(
          'Authorization',
          'Bearer ' + this.authService.accessToken
        ),
      });
      return next.handle(newRequest).pipe(
        catchError((err) => {
          if (err.status == 401) {
            this.authService.logout();
          }
          return throwError(err);
        })
      );
    }
    return next.handle(request);
  }
}
