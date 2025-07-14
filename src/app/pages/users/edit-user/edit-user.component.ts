import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from '../../../services/users.service';
import { RoleService, AppRole } from '../../../services/role.service';
import { AppUser } from '../../../interface/AppUser';
import { AppUserUpdateDto } from '../../../interface/AppUserUpdateDto';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],

  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  isLoading = false;
  isSaving = false;
  isLoadingRoles = false;
  userId: string = '';
  user: AppUser | null = null;
  availableRoles: AppRole[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private usersService: UsersService,
    private roleService: RoleService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      dateOfEmployment: [''],
      roles: [[]]
    });
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id') || '';
    if (this.userId) {
      this.loadRoles();
      this.loadUserDetails();
    } else {
      this.snackBar.open('User ID not provided', 'Close', { duration: 3000 });
      this.router.navigate(['/users']);
    }
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
        this.snackBar.open('Error loading roles', 'Close', { duration: 3000 });
        this.isLoadingRoles = false;
      }
    });
  }

  loadUserDetails() {
    this.isLoading = true;
    this.usersService.getUserById(this.userId).subscribe({
      next: (user: AppUser) => {
        this.user = user;
        this.populateForm(user);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error loading user details:', error);
        this.snackBar.open('Error loading user details', 'Close', { duration: 3000 });
        this.isLoading = false;
        this.router.navigate(['/users']);
      }
    });
  }

  populateForm(user: AppUser) {
    this.userForm.patchValue({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      phoneNumber: user.phoneNumber || '',
      dateOfEmployment: user.dateOfEmployment || '',
      roles: user.appUserRoles.map(role => role.id)
    });
  }

  onSubmit() {
    if (this.userForm.valid && this.user) {
      this.isSaving = true;
      
      // Create update DTO with only changed fields
      const updateDto: AppUserUpdateDto = {
        username: this.userForm.value.username,
        firstName: this.userForm.value.firstName,
        lastName: this.userForm.value.lastName,
        email: this.userForm.value.email,
        phoneNumber: this.userForm.value.phoneNumber || undefined,
        dateOfEmployment: this.userForm.value.dateOfEmployment || undefined,
        firebaseId: this.user.firebaseId || undefined,
        roleIds: this.userForm.value.roles && this.userForm.value.roles.length > 0 ? this.userForm.value.roles : undefined
      };

      this.usersService.updateUser(this.userId, updateDto).subscribe({
        next: () => {
          this.snackBar.open('User updated successfully', 'Close', { duration: 3000 });
          this.isSaving = false;
          this.router.navigate(['/users']);
        },
        error: (error: any) => {
          console.error('Error updating user:', error);
          this.snackBar.open('Error updating user', 'Close', { duration: 3000 });
          this.isSaving = false;
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/users']);
  }

  getUserRoles(): string {
    if (!this.user?.appUserRoles) return '';
    return this.user.appUserRoles.map((role: any) => role.name).join(', ');
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} is required`;
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('minlength')) {
      const requiredLength = control.getError('minlength').requiredLength;
      return `${controlName.charAt(0).toUpperCase() + controlName.slice(1)} must be at least ${requiredLength} characters`;
    }
    return '';
  }
} 