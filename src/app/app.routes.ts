import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'prefix',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('../libs/pages/home').then((mod) => mod.HomeComponent),
  },
  {
    path: 'sign-in',
    loadComponent: () =>
      import('../libs/pages/sign-in').then((mod) => mod.SignInComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('../libs/pages/sign-up').then((mod) => mod.SignUpComponent),
  },
  {
    path: 'verify-code',
    loadComponent: () =>
      import('../libs/pages/verify-code').then(
        (mod) => mod.VerifyCodeComponent
      ),
  },
];
