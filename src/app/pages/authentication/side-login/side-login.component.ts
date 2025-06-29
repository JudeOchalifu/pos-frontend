import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {NgIf} from "@angular/common"; // adjust path as needed

@Component({
  selector: 'app-side-login',
  standalone: true,
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {}

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
        this.isLoading=false;
        console.log('Login successful', response);
        localStorage.setItem("appUser", JSON.stringify(response));
        this.router.navigate(['/dashboard']); // navigate to home or dashboard
      },
      error: (err) => {
        this.isLoading=false;
        console.error('Login failed', err);
        alert('Invalid username or password');
      }
    });
  }
}
