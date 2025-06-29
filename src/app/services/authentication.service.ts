import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private router: Router) {
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
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
  resetPassword(payload: {email: string, password:string, passwordConfirmation: string}): Observable<HttpResponse<any>> {
    return this.http.patch(`${this.baseUrl}/api/v1/appuser/reset-password`, payload, {
      observe: 'response'
    });
  }

  getCurrentUserFromLocal() {
    return localStorage.getItem('appUser');
  }

  doLogOut() {
    console.log("LOGGING OUT===================================================>")
    localStorage.clear();
    this.router.navigate(['/authentication/login']); //
  }
}


