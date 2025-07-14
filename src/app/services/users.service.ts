import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AppUser, AppUserPaginatedResponse } from '../interface/AppUser';
import { AppUserUpdateDto } from '../interface/AppUserUpdateDto';

export interface UsersFilterRequest {
  page: number;
  size: number;
  status?: string;
  name?: string;
  username?: string;
  roleId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUsers(filter: UsersFilterRequest): Observable<AppUserPaginatedResponse> {
    let params = new HttpParams()
      .set('page', filter.page.toString())
      .set('size', filter.size.toString());

    if (filter.status) {
      params = params.set('status', filter.status);
    }
    if (filter.name) {
      params = params.set('name', filter.name);
    }
    if (filter.username) {
      params = params.set('username', filter.username);
    }
    if (filter.roleId) {
      params = params.set('roleId', filter.roleId);
    }

    return this.http.get<AppUserPaginatedResponse>(`${this.apiUrl}/api/v1/appuser/get/all/users`, { params });
  }

  getUserById(userId: string): Observable<AppUser> {
    const params = new HttpParams().set('id', userId);
    return this.http.get<AppUser>(`${this.apiUrl}/api/v1/appuser/find/by/id`, { params });
  }

  updateUser(userId: string, userData: AppUserUpdateDto): Observable<AppUser> {
    return this.http.put<AppUser>(`${this.apiUrl}/api/v1/appuser/update/${userId}`, userData);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/v1/appuser/delete/${userId}`);
  }
} 