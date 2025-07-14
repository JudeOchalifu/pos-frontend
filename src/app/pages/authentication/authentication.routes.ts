import { Routes } from '@angular/router';

import { AppSideLoginComponent } from './side-login/side-login.component';
import { AppSideRegisterComponent } from './side-register/side-register.component';
import {SidePasswordResetComponent} from "./side-password-reset/side-password-reset.component";
import { ErrorComponent } from './error/error.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AppSideLoginComponent,
      },
      {
        path: 'register',
        component: AppSideRegisterComponent,
      },
      {
        path: 'reset-password',
        component: SidePasswordResetComponent,
      },
      {
        path: 'error',
        component: ErrorComponent,
      },
    ],
  },
];
