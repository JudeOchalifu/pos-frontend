import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface AppRole {
  id: string;
  name: string;
  description: string;
  dateCreated: string;
  privileges: AppPrivilege[];
}

export interface AppPrivilege {
  id: string;
  name: string;
  description: string;
  type: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllRoles(): Observable<AppRole[]> {
    return this.http.get<AppRole[]>(`${this.apiUrl}/api/v1/role/find/all`);
  }
} 