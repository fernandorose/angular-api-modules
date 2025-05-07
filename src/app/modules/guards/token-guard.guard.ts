import { inject, Injectable } from '@angular/core';
import { Router, type CanActivate } from '@angular/router';
import { UsersService } from '../services/users.service';

@Injectable({
  providedIn: 'root',
})
export class TokenGuard implements CanActivate {
  private usersService = inject(UsersService);
  private router = inject(Router);

  canActivate() {
    if (this.usersService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
}
