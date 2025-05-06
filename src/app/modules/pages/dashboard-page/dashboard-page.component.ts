import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserProviderService } from '../../services/providers/user-provider';
import { ActiveButtonComponent } from '../../themes/buttons/active-button/active-button.component';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard-page',
  imports: [ActiveButtonComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  logoutButton = {
    buttonName: 'Logout',
    event: '',
  };

  user: User | null = null;

  private userProvider = inject(UserProviderService);
  private userService = inject(UsersService);
  private router = inject(Router);
  private cookiesService = inject(CookieService);

  ngOnInit(): void {
    const token = this.cookiesService.get('authToken');
    this.userProvider.initFromStorage();
    this.userProvider.user$.subscribe((data) => {
      this.user = data;
    });
    // this.userService.getAuthUser(token).subscribe((data) => {
    //   console.log(data);
    //   const user = {
    //     firstName: data.firstName,
    //     lastName: data.lastName,
    //     email: data.email,
    //     bank: data.bank,
    //   };
    //   localStorage.setItem('user', JSON.stringify(user));
    // });
  }

  logout() {
    this.userProvider.logout();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}

export default DashboardPageComponent;
