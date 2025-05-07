import { Routes } from '@angular/router';
import { LoginPageComponent } from './modules/pages/login-page/login-page.component';
import { TokenGuard } from './modules/guards/token-guard.guard';
import { NavbarLayoutComponent } from './modules/layouts/navbar-layout/navbar-layout.component';
import { NotFoundPageComponent } from './modules/pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: NavbarLayoutComponent,
    canActivate: [TokenGuard],
    children: [
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () =>
          import('./modules/pages/dashboard-page/dashboard-page.component'),
        canActivate: [TokenGuard],
      },
      {
        path: 'my-profile',
        title: 'My profile',
        loadComponent: () =>
          import(
            './modules/pages/user-profile-page/user-profile-page.component'
          ),
      },
      {
        path: 'recipes',
        title: 'Recipes',
        loadComponent: () =>
          import('./modules/pages/recipes-page/recipes-page.component'),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
