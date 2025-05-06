import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { UsersService } from '../users.service';
import { User, UserData } from '../../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserProviderService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  private usersService = inject(UsersService);
  private cookiesService = inject(CookieService);

  fetchUser() {
    const token = this.cookiesService.get('authToken');
    if (!token) {
      this.userSubject.next(null);
      return;
    }

    this.usersService.getAuthUser(token).subscribe({
      next: (user) => this.userSubject.next(user),
      error: () => this.userSubject.next(null),
    });
  }

  initFromStorage() {
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      this.userSubject.next(user);
    }
  }

  getUserFromLocalStorage() {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }

  setUser(user: User) {
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearUser() {
    this.userSubject.next(null);
    localStorage.removeItem('user');
  }

  logout() {
    this.cookiesService.delete('authToken');
    this.userSubject.next(null);
  }

  get currentUser(): User | null {
    return this.userSubject.value;
  }
}
