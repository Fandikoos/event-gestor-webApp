import type { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

// Interceptores, sirven para gestionar las llamdas http al servidor y por ejemplo validar errores o lo que queramos, acordar de ponerlo en app.config.ts
export const interceptorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError((error: HttpErrorResponse) => {
    let errorMessage = "";

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error code: ${error.status}, message: ${error.message}`;
    }

    return throwError(() => errorMessage);
  }))
};
