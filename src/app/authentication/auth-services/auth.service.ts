import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login, signup } from '../signup/signup.component';
import {catchError, map, Observable, of } from 'rxjs';
import { Route } from '@angular/router';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  constructor(private http:HttpClient) {
   }

   private apiUrl = environment.BaseUrl;

   signup(data:signup){
     return this.http.post(`${this.apiUrl}signup/`,data);
   }


   loginauth(email:string,password:string): Observable<any> {
    const loginData = {email , password };
    return this.http.post<any>(`${this.apiUrl}login`,loginData)
  }

  wishListCount(userId: number): Observable<any>{
   return this.http.get(`${this.apiUrl}getWishListItems/${userId}`)
  }

 

 
  }

