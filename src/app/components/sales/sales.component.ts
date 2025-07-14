import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {SalesService, SalesFilterRequest} from 'src/app/services/sales.service';
import {Sale} from "../../interface/Sale";
import {PaginatedResponse} from "../../interface/ApiResponse";
import {MatCard} from "@angular/material/card";
import {CommonModule} from "@angular/common";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatOption, MatSelect} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatButton} from "@angular/material/button";
import {MatNativeDateModule} from "@angular/material/core";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {AppUser, AppUserPaginatedResponse} from "../../interface/AppUser";
import {MatIcon} from "@angular/material/icon";
import {MatProgressSpinner} from "@angular/material/progress-spinner";


@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCard, MatPaginator, MatFormField,
    MatInput, MatLabel, MatSelect, MatOption, FormsModule, MatDatepickerInput,
    MatDatepickerToggle, MatDatepicker, MatButton, MatDatepickerModule,
    MatNativeDateModule, MatFormFieldModule, MatInputModule, MatIcon, MatProgressSpinner],

  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent implements OnInit {
  displayedColumns: string[] = ['user', 'grossAmount', 'initiationTime', 'closed', 'tableNumber'];
  dataSource = new MatTableDataSource<Sale>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private allSales: Sale[] = []; // Store all sales data for filtering

  constructor(private salesService: SalesService, private usersService: UsersService, private router: Router) {
  }
  
  isLoading = false;
  users: AppUser[] = [];
  selectedUser: string = '';
  selectedStatus: string = '';
  selectedFilter: 'user' | 'tableNumber' = 'user';
  filterValue: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;

  onFilter() {
    this.isLoading = true;
    // Build filter parameters for backend API
    const filter: SalesFilterRequest = {
      page: 0,
      size: environment.defaultPageSize,
      ...(this.selectedUser && { userId: this.selectedUser }),
      ...(this.selectedStatus && this.selectedStatus !== 'all' && { status: this.selectedStatus.toLowerCase() as 'open' | 'closed' }),
      ...(this.startDate && { fromDate: this.startDate.toISOString().split('T')[0] }),
      ...(this.endDate && { toDate: this.endDate.toISOString().split('T')[0] })
    };

    this.salesService.getSales(filter).subscribe({
      next: (response: PaginatedResponse<Sale>) => {
        this.allSales = response.content;
        this.dataSource.data = this.allSales;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error filtering sales:', error);
        this.isLoading = false;
      }
    });
  }


  ngOnInit() {
    // Load users first, then sales
    this.loadUsers();
    this.loadSales();
  }

  loadSales(page: number = 0) {
    this.isLoading = true;
    const filter: SalesFilterRequest = {
      page: page,
      size: environment.defaultPageSize
    };

    this.salesService.getSales(filter).subscribe({
      next: (response: PaginatedResponse<Sale>) => {
        this.allSales = response.content; // Store all sales
        this.dataSource.data = this.allSales; // Set initial data
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading sales:', error);
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.loadSales(event.pageIndex);
  }

  clearFilters() {
    this.selectedUser = '';
    this.selectedStatus = '';
    this.startDate = null;
    this.endDate = null;
    // Reload all sales from backend
    this.loadSales(0);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getSerialNumber(index: number): number {
    return (this.paginator.pageIndex * this.paginator.pageSize) + index + 1;
  }

  loadUsers() {
    // Use real backend API
    this.usersService.getAllUsers({ page: 0, size: 100 }).subscribe({
      next: (response: AppUserPaginatedResponse) => {
        this.users = response.content;
        console.log('Successfully fetched users from backend', this.users);
      },
      error: (err: any) => {
        console.error('Error loading users from backend', err);
      }
    });
  }
}
