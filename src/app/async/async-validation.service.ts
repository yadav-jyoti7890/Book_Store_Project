import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { catchError, debounceTime, distinctUntilChanged, map, Observable, of, switchMap } from 'rxjs';
import zxcvbn from 'zxcvbn';

@Injectable({
  providedIn: 'root'
})
export class AsyncValidationService {

  private apiUrl = environment.BaseUrl;
  constructor(private http: HttpClient) {}

checkUsernameExists(username: string) {
  return this.http.get<{ exists: boolean }>(`${this.apiUrl}check-username?username=${username}`);
}

checkEmailExists(email: string) {
  return this.http.get<{ exists: boolean }>(`${this.apiUrl}check-email?email=${email}`);
}


}
