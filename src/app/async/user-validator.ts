import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  switchMap,
  tap,
  map,
  distinctUntilChanged,
} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AsyncValidationService } from './async-validation.service';
import zxcvbn from 'zxcvbn';

@Injectable({ providedIn: 'root' })
export class UsernameValidator {
  // create cache for storing api data   
  private cache = new Map<string, boolean>();
  minScore = 3

  constructor(private usernameService: AsyncValidationService) {} // inject service for api calling 

  checkUsername(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;

      // check if user character greater then 3 so call api
      if (!value || value.length <= 3) {
        return of(null); 
      }

      //repeat value is repeated so  block api call 
      const repeatedPattern = /(.)\1{2,}/; 
      if (repeatedPattern.test(value)) {
        return of(null); 
      }

      // cache value is available so return cache data not call api
      if (this.cache.has(value)) {
        const exists = this.cache.get(value)!;
        return of(exists ? { usernameTaken: true } : null);
      }

     // if cache value not available so call api after 400 mili second
      return of(value).pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((val) => this.usernameService.checkUsernameExists(val)),
        tap((res) => this.cache.set(value, res.exists)),
        map((res) => (res.exists ? { usernameTaken: true } : null))
      );
    };
  }

  checkEmailExists(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;

      // check if user character greater then 3 so call api
      if (!value || value.length <= 5) {
        return of(null); 
      }

      //repeat value is repeated so  block api call 
      const repeatedPattern = /(.)\1{2,}/; 
      if (repeatedPattern.test(value)) {
        return of(null); 
      }

      // cache value is available so return cache data not call api
      if (this.cache.has(value)) {
        const exists = this.cache.get(value)!;
        return of(exists ? {emailTaken: true } : null);
      }

     // if cache value not available so call api after 400 mili second
      return of(value).pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((val) => this.usernameService.checkEmailExists(val)),
        tap((res) => this.cache.set(value, res.exists)),
        map((res) => (res.exists ? { emailTaken: true } : null))
      );
    };
  }




}
