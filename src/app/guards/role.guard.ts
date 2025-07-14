import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    
    // Check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/authentication/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }

    // Get required roles from route data
    const requiredRoles = next.data['roles'] as string[];
    
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles required
    }

    // Check if user has any of the required roles
    const hasRequiredRole = requiredRoles.some(role => 
      this.authService.hasRole(role)
    );

    if (!hasRequiredRole) {
      this.router.navigate(['/dashboard']); // Redirect to dashboard if no access
      return false;
    }

    return true;
  }
} 