import {Component} from '@angular/core';
import {MaterialModule} from '../../material.module';
import {TablerIconsModule} from 'angular-tabler-icons';

interface stats {
  id: number;
  color: string;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
}

@Component({
  selector: 'app-earning-reports',
  imports: [MaterialModule, TablerIconsModule],
  templateUrl: './earning-reports.component.html',
})
export class AppEarningReportsComponent {
  stats: stats[] = [
    {
      id: 1,
      color: 'primary',
      title: 'Anthonia',
      subtitle: '₦45665.00',
      icon: 'solar:user-line-duotone',
      badge: 'Table 16',
    },
    {
      id: 2,
      color: 'error',
      title: 'Bridget',
      subtitle: '₦3000.00',
      icon: 'solar:user-line-duotone',
      badge: 'Table 19',
    },
    {
      id: 3,
      color: 'secondary',
      title: 'Emmanuella',
      subtitle: '₦0.00',
      icon: 'solar:user-line-duotone',
      badge: 'Table 3',
    },
    {
      id: 4,
      color: 'primary',
      title: 'Chisom',
      subtitle: '₦0.00',
      icon: 'solar:user-line-duotone',
      badge: 'Table 8',
    },
    {
      id: 5,
      color: 'warning',
      title: 'Jennifer',
      subtitle: '₦0.00',
      icon: 'solar:user-line-duotone',
      badge: 'Table 12',
    },
  ];
}
