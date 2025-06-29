import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:atom-line-duotone',
    route: '/dashboard',
  },
  {
    displayName: 'Sales',
    iconName: 'solar:widget-add-line-duotone',
    route: '/sales',
    chip: false,
    external: true,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
  },
  {
    displayName: 'User',
    iconName: 'solar:chart-line-duotone',
    route: '/user-management',
    chip: false,
    external: true,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
  },
  {
    displayName: 'CRM',
    iconName: 'solar:screencast-2-line-duotone',
    route: '/dashboard',
    chip: true,
    external: true,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
  }

];
