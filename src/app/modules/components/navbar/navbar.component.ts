import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserProviderService } from '../../services/providers/user-provider';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  user: User | null = null;

  private userProvider = inject(UserProviderService);
  private router = inject(Router);

  ngOnInit(): void {
    this.userProvider.initFromStorage();
    this.userProvider.user$.subscribe((data) => {
      this.user = data;
    });
  }
}
