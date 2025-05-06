import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserProviderService } from '../../services/providers/user-provider';
import { Router } from '@angular/router';
import { ActiveButtonComponent } from '../../themes/buttons/active-button/active-button.component';

@Component({
  selector: 'app-user-profile-page',
  imports: [ActiveButtonComponent],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilePageComponent {
  logoutButton = {
    buttonName: 'Logout',
    event: 'login()',
  };

  user: User | null = null;

  private userProvider = inject(UserProviderService);
  private router = inject(Router);

  ngOnInit(): void {
    this.userProvider.initFromStorage();
    this.userProvider.user$.subscribe((data) => {
      this.user = data;
    });
  }

  logout() {
    this.userProvider.logout();
    this.userProvider.clearUser();
    this.router.navigate(['/']);
  }
}

export default UserProfilePageComponent;
