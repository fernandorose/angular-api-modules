import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { UserProviderService } from '../../services/providers/user-provider';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { CookieService } from 'ngx-cookie-service';
import { ModuleCardComponent } from '../../components/module-card/module-card.component';
import generateId from '../../utils/id-gen';

@Component({
  selector: 'app-dashboard-page',
  imports: [ModuleCardComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent {
  logoutButton = {
    buttonName: 'Logout',
    event: '',
  };

  postsModule = {
    id: `${generateId()}`,
    title: 'Posts',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    event: '',
    route: '/posts',
  };

  recipesModule = {
    id: `${generateId()}`,
    title: 'Recipes',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    event: '',
    route: '/recipes',
  };

  user: User | null = null;

  private userProvider = inject(UserProviderService);
  private router = inject(Router);
  private cookiesService = inject(CookieService);

  ngOnInit(): void {
    const token = this.cookiesService.get('authToken');
    this.userProvider.initFromStorage();
    this.userProvider.user$.subscribe((data) => {
      this.user = data;
    });
  }

  logout() {
    this.userProvider.logout();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }
}

export default DashboardPageComponent;
