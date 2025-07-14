import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { DashboardResolver } from './dashboard/dashboard.resolver';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    resolve: {
      dashboardType: DashboardResolver
    },
    data: {
      title: 'Dashboard',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Sales', url: '/sales' },
        { title: 'Dashboard' },
      ],
    },
  },
];
