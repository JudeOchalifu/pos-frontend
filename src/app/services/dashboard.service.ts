import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';

export interface DashboardConfig {
  type: 'admin' | 'sales';
  title: string;
  description: string;
  features: string[];
  quickActions: QuickAction[];
}

export interface QuickAction {
  title: string;
  description: string;
  icon: string;
  route?: string;
  action?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  constructor(private authService: AuthenticationService) {}

  getDashboardConfig(): DashboardConfig {
    const userRoles = this.authService.getUserRoles();
    
    if (userRoles.includes('SUPER_ADMIN')) {
      return {
        type: 'admin',
        title: 'Welcome, Administrator!',
        description: 'Manage your business operations, users, and analytics from this comprehensive dashboard.',
        features: [
          'User Management',
          'Sales Analytics',
          'Inventory Control',
          'System Reports',
          'Role Management'
        ],
        quickActions: [
          {
            title: 'User Management',
            description: 'Manage users and roles',
            icon: 'people',
            route: '/users'
          },
          {
            title: 'Sales Management',
            description: 'View and manage sales',
            icon: 'point_of_sale',
            route: '/sales'
          },
          {
            title: 'Inventory',
            description: 'Manage stock levels',
            icon: 'inventory'
          },
          {
            title: 'Reports',
            description: 'Generate reports',
            icon: 'analytics'
          }
        ]
      };
    } else if (userRoles.includes('SALES')) {
      return {
        type: 'sales',
        title: 'Welcome, Sales Team!',
        description: 'Track your sales performance, manage transactions, and monitor your targets.',
        features: [
          'Sales Transactions',
          'Performance Tracking',
          'Stock Availability',
          'Sales Reports'
        ],
        quickActions: [
          {
            title: 'Sales Transactions',
            description: 'View and manage sales',
            icon: 'receipt_long',
            route: '/sales'
          },
          {
            title: 'Performance',
            description: 'Track your metrics',
            icon: 'trending_up'
          },
          {
            title: 'Stock Check',
            description: 'Check product availability',
            icon: 'inventory_2'
          }
        ]
      };
    } else {
      // Default admin dashboard for other roles
      return {
        type: 'admin',
        title: 'Welcome!',
        description: 'Access your dashboard features and manage your workspace.',
        features: [
          'Dashboard Overview',
          'Basic Analytics',
          'System Access'
        ],
        quickActions: [
          {
            title: 'Dashboard',
            description: 'View overview',
            icon: 'dashboard'
          }
        ]
      };
    }
  }

  getUserRole(): string {
    const userRoles = this.authService.getUserRoles();
    
    if (userRoles.includes('SUPER_ADMIN')) {
      return 'SUPER_ADMIN';
    } else if (userRoles.includes('SALES')) {
      return 'SALES';
    }
    
    return 'USER';
  }

  canAccessFeature(feature: string): boolean {
    const userRoles = this.authService.getUserRoles();
    
    switch (feature) {
      case 'user-management':
        return userRoles.includes('SUPER_ADMIN');
      case 'sales-management':
        return userRoles.includes('SUPER_ADMIN') || userRoles.includes('SALES');
      case 'reports':
        return userRoles.includes('SUPER_ADMIN') || userRoles.includes('SALES');
      default:
        return true;
    }
  }
} 