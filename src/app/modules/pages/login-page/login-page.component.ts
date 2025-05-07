import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActiveButtonComponent } from '../../themes/buttons/active-button/active-button.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-login-page',
  imports: [ActiveButtonComponent, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  loginButton = {
    buttonName: 'Login',
    event: 'login()',
  };
  inputUsername = {
    placeholder: 'Email',
    type: 'text',
    inputName: 'Username',
    controlName: 'username',
  };
  inputPassword = {
    placeholder: 'Password',
    type: 'password',
    inputName: 'Password',
    controlName: 'password',
  };

  userData: any = null;
  private _fb = inject(FormBuilder);
  private usersService = inject(UsersService);
  private cookiesService = inject(CookieService);
  private router = inject(Router);

  loginError: boolean = false;

  loginForm = this._fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  ngOnInit(): void {
    if (this.usersService.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.loginError = true;
      return;
    }

    const { username, password } = this.loginForm.value;

    this.usersService
      .loginUser(username!, password!)
      .pipe(
        switchMap((data) => {
          const token = data.accessToken;
          this.cookiesService.set('authToken', token, 1);
          return this.usersService.getAuthUser(token);
        })
      )
      .subscribe({
        next: (userData) => {
          localStorage.setItem('user', JSON.stringify(userData));
          this.router.navigate(['/dashboard']);
          this.loginForm.reset();
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
        },
      });
  }
}
