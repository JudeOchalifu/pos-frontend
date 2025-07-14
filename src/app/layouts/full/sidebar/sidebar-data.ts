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
    external: false,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
  },
  {
    displayName: 'Users',
    iconName: 'solar:users-group-rounded-line-duotone',
    route: '/users',
    chip: false,
    external: false,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
    roles: ['SUPER_ADMIN'] // Only show for admin users
  },
  {
    displayName: 'CRM',
    iconName: 'solar:screencast-2-line-duotone',
    route: '/dashboard',
    chip: true,
    external: false,
    chipClass: 'bg-secondary text-white',
    chipContent: 'PRO',
  }
];

// Function to get filtered nav items based on user roles
export function getFilteredNavItems(userRoles: string[]): NavItem[] {
  return navItems.filter(item => {
    // If no roles specified, show to everyone
    if (!item.roles) {
      return true;
    }
    // Check if user has any of the required roles
    return item.roles.some(role => userRoles.includes(role));
  });
}
