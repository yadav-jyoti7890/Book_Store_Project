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

  
    const token = localStorage.getItem('token');

    if (state.url === '/signup') {
   
      console.log(state.url)
    
      if (token) {
        this.router.navigate(['/home']);
        return false; 
      }
    }

    else {
    
      if (!token) {
        this.router.navigate(['/signup']);
        return false; 
      }
    }

    return true; 
  }
}

