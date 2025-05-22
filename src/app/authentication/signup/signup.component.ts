import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  public isActive: 'signup' | 'login' = 'login';
  public signup: signup = new signup();
  public login: login = new login();
  public userid: null | number = null;
  private broadcastChannel = new BroadcastChannel('authentication');

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  toggle(form: 'signup' | 'login') {
    this.isActive = form;
  }

  signup_submit() {
    debugger;
    console.log(this.signup);
    this.auth.signup(this.signup).subscribe(
      (response) => {
        this.snackBar.open('user register successfully ✅!');
        window.location.reload();
        this.isActive = 'login';
        debugger;
      },
      (err) => {
        this.snackBar.open(
          'some error on registration please try again later ✅!'
        );
      }
    );
  }

  isPasswordVisible: boolean = false;
  signup1 = { password: '' };

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login_submit() {
    this.auth.loginauth(this.login.email, this.login.password).subscribe(
      (response) => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userName', response.user.username);
          localStorage.setItem('user_id', response.user.id);
          localStorage.setItem('role', response.user.role);

          this.broadcastChannel.postMessage({
            username: response.user.username,
            role: response.user.role,
          });
          this.snackBar.open('Login successfully ✅!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.router.navigate([
            response.user.role === 'admin' ? './admin_dashboard' : './book',
          ]);
        }
      },
      (error) => {
        console.log('Error during login:', error);
        if (error.status === 404) {
          this.snackBar.open('this email not exist in account ❌!', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        } else if (error.status === 401) {
          this.snackBar.open('Invalid password Address ❌ !', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        } else {
          this.snackBar.open('Email or password wrong ❌ !', 'Close', {
            duration: 3000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      }
    );
  }

  // login_submit() {
  //   debugger
  //   this.auth.loginauth(this.login.email, this.login.password).subscribe((response) => {
  //     console.log(response)
  //     if (response.token) {
  //       debugger
  //       localStorage.setItem('user_id', response.user.id)
  //       localStorage.setItem('username', response.user.username)
  //       localStorage.setItem('role', response.user.role)
  //       this.auth.setToken(response.token)
  //       debugger
  //       this.broadcastChannel.postMessage({ username: response.user.username, role: response.user.role });
  //       debugger
  //       this.router.navigate([response.user.role === 'admin' ? './admin_dashboard' : './user_dashboard']);
  //       debugger
  //       // if (response.user.role === 'admin') {
  //       //   let userid = response.user.id;
  //       //   const user_id = localStorage.setItem("user_id", userid)
  //       //   let username = response.user.username
  //       //   let role = response.user.role
  //       //   this.broadCastChanel.postMessage({ username, role })
  //       //   // Redirect to admin dashboard
  //       // } else {
  //       //   debugger
  //       //   let userid = response.user.id;
  //       //   const user_id = localStorage.setItem("user_id", userid)
  //       //   let username = response.user.username
  //       //   let role = response.user.role
  //       //   this.broadCastChanel.postMessage({ username, role })

  //       // }
  //     }
  //   }, (error) => {
  //     console.log('Login failed:', error);
  //   })

  // }
}

export class signup {
  username: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
  constructor() {
    this.username = '';
    this.email = '';
    this.password = '';
    this.role = '';
  }
}

export class login {
  email: string = '';
  password: string = '';
  role: string = '';
  constructor() {
    this.email = '';
    this.password = '';
    this.role = '';
  }
}

export interface id {
  id: number;
}

// (response) => {
//   debugger
//   console.log(response.token, "auth")
//   debugger
//   if (response.status) {
//     if (response.user.role === 'admin') {
//       this.auth.settoken(response.token);
//       let username = response.user.username
//       let role = response.user.role
//       this.broadCastChanel.postMessage({username,role})
//       alert('Admin login successful');
//       this.router.navigate(['/admin_dashboard']);  // Redirect to admin dashboard
//     } else {
//       debugger
//        this.auth.settoken(response.token);
//        debugger
//        let userid = response.user.id;
//        const user_id = localStorage.setItem("user_id", userid)
//       let username = response.user.username
//      alert('User login successful');
//       let role = response.user.role
//       this.broadCastChanel.postMessage({username,role})
//       this.router.navigate(['/user_dashboard']);  // Redirect to user dashboard
//     }
//   }
// },
// (err) => {
//   console.error('Error during login:', err);
// }
// );
