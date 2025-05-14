import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../authentication/auth-services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,private authService:AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

   

    // Get user data from localStorage
    const token = localStorage.getItem('token');

    if (state.url === '/signup') {
   
      console.log(state.url)
      // If user is already logged in, redirect to home page
      if (token) {
        this.router.navigate(['/home']);
        return false; // Block access to signup
      }
    }

    else {
      // If user is not logged in, redirect to signup page
      if (!token) {
        this.router.navigate(['/signup']);
        return false; // Block access to home
      }
    }

    return true; // Allow access to the route
  }
}

