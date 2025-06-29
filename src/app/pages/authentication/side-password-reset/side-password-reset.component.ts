import {Component} from '@angular/core';
import {Router, RouterModule} from "@angular/router";
import {MaterialModule} from "../../../material.module";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-side-password-reset',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, NgIf],
  templateUrl: './side-password-reset.component.html',
  standalone: true,
  styleUrl: './side-password-reset.component.scss'
})
export class SidePasswordResetComponent {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  isLoading: boolean = false;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required]),
    passwordConfirmation: new FormControl('', [Validators.required]),
  });

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;

    const payload = {
      email: this.form.value.email!,
      password: this.form.value.password!,
      passwordConfirmation: this.form.value.passwordConfirmation!
    };
    console.log('SENDING===========================> ' + JSON.stringify(payload));
    this.authService.resetPassword(payload).subscribe({

      next: (response) => {
        this.isLoading = false;
        console.log('password reset successful', response.body);
        this.router.navigate(['/dashboard']); // navigate to home or dashboard
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Password reset unsuccessful', err.status);
        console.error('Password reset unsuccessful', err.message);
        alert(err.error!.message);
      }
    });
  }
}
