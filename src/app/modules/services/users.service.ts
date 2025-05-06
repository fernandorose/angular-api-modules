import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_GET_USER, API_USER_LOGIN } from '../../environment';
import { User, UserData } from '../interfaces/user.interface';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private http = inject(HttpClient);
  private cookiesService = inject(CookieService);

  loginUser(username: string, password: string) {
    return this.http.post<User>(API_USER_LOGIN, {
      username,
      password,
    });
  }

  getAuthUser(authToken: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${authToken}`,
    });
    return this.http
      .get<User>(API_GET_USER, {
        headers,
      })
      .pipe(
        tap((data) => {
          console.log(data);
        })
      );
  }

  isAuthenticated(): boolean {
    return this.cookiesService.check('authToken');
  }
}
