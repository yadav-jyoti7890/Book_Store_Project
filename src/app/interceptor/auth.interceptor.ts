import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from "@angular/common/http";
import { catchError, finalize, tap, throwError } from "rxjs";
import { NotificationsService } from "../admin/notification-service/notifications.service";
import { inject } from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const notification = inject(NotificationsService);
  


  let clonedReq = req;
  if (token) {
    clonedReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
  }

  return next(clonedReq).pipe(
    
    catchError((error: HttpErrorResponse) => {

      const errMsg = error.error?.message;

      if (error.status === 401) {
        notification.showError(errMsg || ' Unauthorized user. Please login first.');
      } else if (error.status === 500) {
        notification.showError(errMsg || ' Network error. Please try again later.');
      } else {
        notification.showError(errMsg || ' Something went wrong.');
      }

      return throwError(() => error);

    
    })
  );
};
