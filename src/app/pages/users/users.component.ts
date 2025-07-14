import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { UsersService, UsersFilterRequest } from '../../services/users.service';
import { RoleService, AppRole } from '../../services/role.service';
import { AppUser } from '../../interface/AppUser';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule, 
    MaterialModule, 
    MatTableModule, 
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSortModule,
    FormsModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['select', 'sn', 'name', 'username', 'email', 'roles', 'dateCreated', 'actions'];
  dataSource = new MatTableDataSource<AppUser>([]);
  selection = new SelectionModel<AppUser>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  isLoading = false;
  isLoadingRoles = false;
  totalElements = 0;
  pageSize = 10;
  currentPage = 0;

  // Filter properties
  selectedStatus: string = '';
  searchName: string = '';
  searchUsername: string = '';
  selectedRoleId: string = '';
  availableRoles: AppRole[] = [];

  constructor(private usersService: UsersService, private roleService: RoleService, private router: Router) {}

  ngOnInit() {
    this.loadRoles();
    this.loadUsers();
  }

  loadRoles() {
    this.isLoadingRoles = true;
    this.roleService.getAllRoles().subscribe({
      next: (roles: AppRole[]) => {
        this.availableRoles = roles;
        this.isLoadingRoles = false;
      },
      error: (error: any) => {
        console.error('Error loading roles:', error);
        this.isLoadingRoles = false;
      }
    });
  }

  loadUsers(page: number = 0) {
    this.isLoading = true;
    this.currentPage = page;

    const filter: UsersFilterRequest = { page: page, size: this.pageSize };
    
    if (this.selectedStatus) {
      filter.status = this.selectedStatus;
    }
    if (this.searchName) {
      filter.name = this.searchName;
    }
    if (this.searchUsername) {
      filter.username = this.searchUsername;
    }
    if (this.selectedRoleId) {
      filter.roleId = this.selectedRoleId;
    }

    // Use real backend API
    this.usersService.getAllUsers(filter).subscribe({
      next: (response) => {
        this.dataSource.data = response.content;
        this.totalElements = response.totalElements;
        this.dataSource.paginator = this.paginator;
        this.isLoading = false;
        // Clear selection when data changes
        this.selection.clear();
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading = false;
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: AppUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.firstName} ${row.lastName}`;
  }

  onFilter() {
    console.log('Filtering users:', {
      status: this.selectedStatus,
      name: this.searchName,
      username: this.searchUsername,
      roleId: this.selectedRoleId
    });
    
    this.loadUsers(0);
  }

  clearFilters() {
    this.selectedStatus = '';
    this.searchName = '';
    this.searchUsername = '';
    this.selectedRoleId = '';
    this.loadUsers(0);
  }

  onPageChange(event: PageEvent) {
    this.loadUsers(event.pageIndex);
  }

  getSerialNumber(index: number): number {
    return (this.currentPage * this.pageSize) + index + 1;
  }

  getUserRoles(user: AppUser): string {
    return user.appUserRoles.map(role => role.name).join(', ');
  }

  getUserFullName(user: AppUser): string {
    return `${user.firstName} ${user.lastName}`;
  }

  editUser(user: AppUser) {
    this.router.navigate(['/users/edit', user.id]);
  }

  deleteUser(user: AppUser) {
    console.log('Delete user:', user);
    // TODO: Implement delete functionality
  }

  addNewUser() {
    // TODO: Navigate to add user page when implemented
    console.log('Add new user clicked');
    // this.router.navigate(['/users/add']);
  }

  // Get selected users
  getSelectedUsers(): AppUser[] {
    return this.selection.selected;
  }
} 