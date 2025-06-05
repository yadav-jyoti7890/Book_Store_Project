import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth-services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationComponent } from '../../validation/validation/validation.component';
import {
  login,
  loginForm,
  signup,
  signupForm,
} from '../auth-interface/signup-interface/signup-interface';
// import { UserValidatorService } from '../../async/async-validation';
import { AsyncValidationService } from '../../async/async-validation.service';
import { debounceTime, distinctUntilChanged, filter, of, Subscription, switchMap, tap } from 'rxjs';
import { UsernameValidator } from '../../async/user-validator';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, ValidationComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit {
  private broadcastChannel = new BroadcastChannel('authentication');
  public isActive: 'signup' | 'login' = 'login';
  public userid: null | number = null;
  public signupForm!: FormGroup<signupForm>;
  public loginForm!: FormGroup<loginForm>;
  isPasswordVisible: boolean = false;
  signup1 = { password: '' };
  private emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
  private usernameSubscription!: Subscription;
  private cache = new Map<string, boolean>();

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private validator: UsernameValidator
  ) {}

  ngOnInit(): void {
    this.signupForm = new FormGroup<signupForm>({
      username: new FormControl(null, [Validators.required], [this.validator.checkUsername()]),
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)], [this.validator.checkEmailExists()]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        // Validators.maxLength(8),
      ]),
    });

    this.loginForm = new FormGroup<loginForm>({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(10),
      ]),
    });

// this.usernameSubscription = this.signupForm.get('username')!.valueChanges.pipe(
//   debounceTime(400), // user stopped typing for 400ms
//   filter((value): value is string => !!value && value.length >= 3), // only after 3+ chars
//   distinctUntilChanged(),
//   switchMap(value => {
//     if (this.cache.has(value)) {
//       console.log('📦 From cache:', value);
//       const exists = this.cache.get(value)!;
//       return of({ exists });
//     }
//     console.log('🌐 API call for:', value);
//     return this.asyncValidation.checkUsernameExists(value).pipe(
//       tap(res => this.cache.set(value, res.exists))
//     );
//   })
// ).subscribe(res => {
//   if (res.exists) {
//     this.signupForm.get('username')?.setErrors({ usernameTaken: true });
//   }
// });


  }

  toggle(form: 'signup' | 'login') {
    this.isActive = form;
  }

  register() {
    if (this.signupForm.valid) {
      const rawValue = this.signupForm.value;

      const signupData: signup = {
        username: rawValue.username ?? '',
        email: rawValue.email ?? '',
        password: rawValue.password ?? '',
      };

      this.auth.signup(signupData).subscribe(
        (response) => {
          this.snackBar.open('User registered successfully ✅!');
          this.signupForm.reset();
          this.isActive = 'login';
        },
        (error) => {}
      );
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  login() {
    if (this.loginForm.valid) {
      const rawValue = this.loginForm.value;
      const loginData: login = {
        email: rawValue.email ?? '',
        password: rawValue.password ?? '',
      };
      this.auth.login(loginData).subscribe(
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
  }
}
