import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Unauthorized error from interceptor');
      } else if (error.status === 403) {
        console.warn('Forbidden error from interceptor');
      } else if (error.status === 404) {
        console.warn('Not Found error from interceptor');
      } else {
        console.warn('An error occurred from interceptor');
      }

      return throwError(() => error);
    })
  );
};
