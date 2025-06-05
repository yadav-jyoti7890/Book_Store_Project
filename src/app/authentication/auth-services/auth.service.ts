import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map, Observable, of } from 'rxjs';
import { Route } from '@angular/router';
import { environment } from '../../../environments/environment.prod';
import { login, signup } from '../auth-interface/signup-interface/signup-interface';

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


   login(data:login): Observable<any> {
    console.log(data)
    return this.http.post<any>(`${this.apiUrl}login`,data)
  }

  wishListCount(userId: number): Observable<any>{
   return this.http.get(`${this.apiUrl}getWishListItems/${userId}`)
  }

 

 
  }

