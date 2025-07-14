# Role-Based Dashboards

This document describes the implementation of role-based dashboards in the POS Frontend application.

## Overview

The application now supports separate dashboards for different user roles:

- **SUPER_ADMIN Dashboard**: Comprehensive management dashboard with full system access
- **SALES Dashboard**: Sales-focused dashboard with transaction and performance tracking

## Features

### SUPER_ADMIN Dashboard
- **Welcome Section**: Personalized greeting with admin-specific messaging
- **Quick Access Cards**: 
  - User Management (links to /users)
  - Sales Management (links to /sales)
  - Inventory Management
  - Reports Generation
- **Analytics Components**: Sales profit, total income, stock reports, earning reports
- **Role-Based Navigation**: Only shows navigation items appropriate for admin users

### SALES Dashboard
- **Welcome Section**: Sales team-focused greeting
- **Quick Action Cards**:
  - Sales Transactions (links to /sales)
  - Performance Tracking
  - Stock Availability Check
- **Sales Analytics**: Focused on sales performance and metrics
- **Simplified Navigation**: Only shows sales-relevant navigation items

## Implementation Details

### Components
- `AdminDashboardComponent`: Handles admin dashboard display
- `SalesDashboardComponent`: Handles sales dashboard display
- `DashboardResolver`: Determines which dashboard to show based on user role
- `DashboardService`: Provides dashboard configuration and utilities

### Services
- `AuthenticationService`: Extended with role management methods
- `DashboardService`: Manages dashboard configuration and role-based features
- `RoleService`: Handles role-related API calls

### Guards
- `LoginGuard`: Ensures user authentication
- `RoleGuard`: Protects routes based on user roles

### Routing
- Dashboard routes use a resolver to determine the appropriate dashboard
- User management routes are protected with role-based access control
- Navigation items are filtered based on user roles

## User Roles

### SUPER_ADMIN
- Full system access
- User management capabilities
- All dashboard features
- Access to all navigation items

### SALES
- Sales-focused dashboard
- Transaction management
- Performance tracking
- Limited navigation (no user management)

## Configuration

### Adding New Roles
1. Update the `DashboardService.getDashboardConfig()` method
2. Add role-specific dashboard configuration
3. Update navigation filtering in `sidebar-data.ts`
4. Add role guards to protected routes

### Customizing Dashboards
1. Modify dashboard components (`admin-dashboard` or `sales-dashboard`)
2. Update dashboard service configuration
3. Add new quick actions or features as needed

## Security

- Role-based access control implemented at route level
- Navigation items filtered based on user permissions
- API endpoints protected with role-based guards
- User authentication verified on each route change

## Usage

1. **Login**: Users log in with their credentials
2. **Role Detection**: System automatically detects user roles from login response
3. **Dashboard Selection**: Appropriate dashboard is loaded based on user role
4. **Navigation**: Only relevant navigation items are displayed
5. **Access Control**: Protected routes require appropriate role permissions

## API Integration

The system expects the login response to include user role information:

```typescript
interface LoginResponse {
  appUser: AppUser;
  message: string;
  token: string;
  username: string;
}

interface AppUser {
  // ... other properties
  appUserRoles: AppUserRole[];
}

interface AppUserRole {
  id: string;
  name: string; // 'SUPER_ADMIN' or 'SALES'
  description: string;
  // ... other properties
}
```

## Future Enhancements

- Add more role types (e.g., INVENTORY_MANAGER, CASHIER)
- Implement role-based feature toggles
- Add dashboard customization options
- Support for dynamic dashboard layouts
- Role-based notification systems 