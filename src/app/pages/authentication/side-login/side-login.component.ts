import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgIf } from "@angular/common";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  returnUrl: string = '/dashboard';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private toastr: ToastrService,
  ) {
    // Get return url from route parameters or default to '/dashboard'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  form = new FormGroup({
    uname: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required]),
  });

  isLoading: boolean

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading=true;

    const credentials = {
      username: this.form.value.uname!,
      password: this.form.value.password!
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.toastr.success('Login successful!');
        this.router.navigate([this.returnUrl]);
      },
      error: (err: any) => {
        this.isLoading = false;
        this.toastr.error('Login failed. Please check your credentials.');
      }
    });
  }
}
