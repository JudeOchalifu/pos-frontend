import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../../material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  template: `
    <div class="blank-layout-container justify-content-center align-items-center bg-light">
      <div class="position-relative row w-100 h-100 bg-gredient justify-content-center">
        <div class="col-lg-4 d-flex align-items-center">
          <mat-card class="cardWithShadow boxed-auth">
            <mat-card-content class="p-32 text-center">
              <div class="mb-4">
                <mat-icon class="error-icon" color="warn">error_outline</mat-icon>
              </div>
              <h2 class="mb-3">Oops! Something went wrong</h2>
              <p class="text-muted mb-4">
                The page you're looking for doesn't exist or you don't have permission to access it.
              </p>
              <div class="d-flex gap-2 justify-content-center">
                <button mat-flat-button color="primary" (click)="goHome()">
                  Go Home
                </button>
                <button mat-stroked-button (click)="goBack()">
                  Go Back
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .error-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
    }
  `]
})
export class ErrorComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  goBack() {
    window.history.back();
  }
} 