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
 
  // private boradCastChanel = new BroadcastChannel('authentication');
 
  constructor(private http:HttpClient) {
   }

   private apiUrl = environment.BaseUrl;

  //  private url = "http://localhost:3000/signup";
  //  private url1 = "http://localhost:3000/login";
  //  private url2 = "http://localhost:3000/protected";
  //  private Url3 = 'http://localhost:3000/validate-token'; 


   signup(data:signup){
     return this.http.post(`${this.apiUrl}signup/`,data);
   }


   loginauth(email:string,password:string): Observable<any> {
    const loginData = {email , password };
    return this.http.post<any>(`${this.apiUrl}login`,loginData)
  }

  // verifyToken(): Observable<boolean> {
  
  //   const token = localStorage.getItem('token');
  //   debugger
  //   if (!token) {
  //     return of(false); 
  //   }

  //   return this.http.post<{ valid: boolean }>('http://localhost:3000/validate-token', { token }).pipe(
  //     map(response => response.valid),
  //     catchError(() => of(false)) 
  //   );
  // }



  // isLoggedIn(): boolean {
  //     console.log(!this.getToken())
  //     return !this.getToken();
  //   }
  
  //   getToken(){
  //   debugger
  //   return localStorage.getItem('token');
  //   }

  // checkLoginStatus(): Observable<any> {
  //   debugger
  //   let token = localStorage.getItem('token');
  //   if (token) {
  //     debugger
  //     return this.verifyToken();
  //   }
  //   return of({ isLoggedIn: false });
  // }

  // isAuthenticated(): boolean {
  //   return !!localStorage.getItem('token');  // Returns true if token exists
  // }
  
  // setToken(token: string): void {
  //   debugger
  //   localStorage.setItem('token', token);
  // }

  // // Get JWT token from localStorage
  // // getToken(): string | null {
  // //   debugger
  // //   return localStorage.getItem('token');
  // // }

  // // Remove JWT token
  // logout(): void {
  //   debugger
  //   localStorage
  //   localStorage.removeItem('token');
  // }

  // isLoggedIn(): boolean {
  //   debugger
  //   return !!this.getToken();
  // }

  // getToken(){
  //   debugger
  //  return localStorage.getItem('token');
  // }
 
  }

