import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardResolver implements Resolve<string> {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  resolve(): Observable<string> {
    const currentUser = this.authService.getCurrentUser();
    
    if (!currentUser) {
      this.router.navigate(['/authentication/login']);
      return of('');
    }

    // Check if user has SUPER_ADMIN role
    const hasSuperAdminRole = currentUser.appUserRoles?.some(role => 
      role.name === 'SUPER_ADMIN'
    );

    // Check if user has SALES role
    const hasSalesRole = currentUser.appUserRoles?.some(role => 
      role.name === 'SALES'
    );

    if (hasSuperAdminRole) {
      return of('admin');
    } else if (hasSalesRole) {
      return of('sales');
    } else {
      // Default to admin dashboard for other roles
      return of('admin');
    }
  }
} 