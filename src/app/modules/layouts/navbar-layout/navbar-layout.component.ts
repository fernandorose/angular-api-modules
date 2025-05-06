import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-navbar-layout',
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './navbar-layout.component.html',
  styleUrl: './navbar-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarLayoutComponent {}
