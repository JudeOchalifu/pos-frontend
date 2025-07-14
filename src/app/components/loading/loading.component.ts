import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
    <div *ngIf="loadingService.isLoading$ | async" class="loading-overlay">
      <div class="loading-content">
        <mat-spinner diameter="50"></mat-spinner>
        <p class="loading-message">{{ loadingService.loadingMessage$ | async }}</p>
      </div>
    </div>
  `,
  styles: [`
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .loading-content {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .loading-message {
      margin-top: 1rem;
      color: #666;
      font-size: 14px;
    }
  `]
})
export class LoadingComponent {
  constructor(public loadingService: LoadingService) {}
} 