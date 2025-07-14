import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Sale } from '../interface/Sale';
import { PaginatedResponse } from '../interface/ApiResponse';
import { environment } from '../../environments/environment';
import { ToastrService } from 'ngx-toastr';

export interface SalesFilterRequest {
  page: number;
  size: number;
  fromDate?: string;
  toDate?: string;
  region?: string;
  productType?: string;
  userId?: string;
  status?: 'open' | 'closed' | 'all';
}

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  getSales(filter: SalesFilterRequest): Observable<PaginatedResponse<Sale>> {
    const params = new HttpParams({
      fromObject: {
        page: filter.page.toString(),
        size: filter.size.toString(),
        ...(filter.fromDate && { fromDate: filter.fromDate }),
        ...(filter.toDate && { toDate: filter.toDate }),
        ...(filter.region && { region: filter.region }),
        ...(filter.productType && { productType: filter.productType }),
        ...(filter.userId && { userId: filter.userId }),
        ...(filter.status && { status: filter.status })
      }
    });
    
    return this.http.get<PaginatedResponse<Sale>>(`${this.baseUrl}/api/v1/sales/get/all/sales`, { params }).pipe(
      catchError(error => {
        if (error.status === 0) {
          this.toastr.error('Cannot connect to backend server. Please ensure the backend is running on port 8080.');
        } else if (error.status === 401) {
          this.toastr.error('Access denied. Please check your authentication.');
        } else {
          this.toastr.error(`Failed to load sales: ${error.message || 'Unknown error'}`);
        }
        return throwError(() => error);
      })
    );
  }


}
