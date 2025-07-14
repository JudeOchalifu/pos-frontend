// error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private toastr: ToastrService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          localStorage.removeItem('appUser');
          this.toastr.warning('Session expired. Please log in again.');
          this.router.navigate(['/authentication/login']);
        } else if (error.status === 403) {
          this.toastr.error('Access denied. You do not have permission to perform this action.');
        } else if (error.status === 404) {
          this.toastr.error('Resource not found.');
        } else if (error.status >= 500) {
          this.toastr.error('Server error. Please try again later.');
        } else {
          this.toastr.error('An error occurred. Please try again.');
        }
        return throwError(() => error);
      })
    );
  }
}
