import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Router} from "@angular/router";
import {UserFilterRequest} from "../interface/UserFilterRequest";
import {LoginResponse, User, ApiResponse, PaginatedResponse} from "../interface/ApiResponse";
import {AppUser} from "../interface/AppUser";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private toastr: ToastrService
  ) {
  }

  login(credentials: { username: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('appUser', JSON.stringify(response));
          this.toastr.success(response.message || 'Login successful!');
        }
      }),
      catchError(error => {
        this.toastr.error('Login failed. Please check your credentials.');
        return throwError(() => error);
      })
    );
  }

  // Registration method
  register(user: {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string; // optional if handled in backend
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/v1/auth/register`, user);
  }

  // Password reset method
  resetPassword(payload: {
    email: string,
    password: string,
    passwordConfirmation: string
  }): Observable<HttpResponse<any>> {
    return this.http.patch(`${this.baseUrl}/api/v1/appuser/reset-password`, payload, {
      observe: 'response'
    });
  }

  getCurrentUserFromLocal(): LoginResponse | null {
    const userStr = localStorage.getItem('appUser');
    return userStr ? JSON.parse(userStr) : null;
  }

  getCurrentUser(): AppUser | null {
    const loginResponse = this.getCurrentUserFromLocal();
    return loginResponse?.appUser || null;
  }

  getUserRoles(): string[] {
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.appUserRoles) {
      return currentUser.appUserRoles.map(role => role.name);
    }
    return [];
  }

  hasRole(roleName: string): boolean {
    return this.getUserRoles().includes(roleName);
  }

  isAuthenticated(): boolean {
    const user = this.getCurrentUserFromLocal();
    if (!user || !user.token) {
      return false;
    }
    
    // For now, just check if token exists
    // TODO: Add JWT token expiration check if needed
    return true;
  }

  doLogOut() {
    localStorage.clear();
    this.toastr.info('You have been logged out successfully.');
    this.router.navigate(['/authentication/login']);
  }


}


