import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private loadingMessageSubject = new BehaviorSubject<string>('Loading...');

  isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();
  loadingMessage$: Observable<string> = this.loadingMessageSubject.asObservable();

  show(message: string = 'Loading...') {
    this.loadingMessageSubject.next(message);
    this.isLoadingSubject.next(true);
  }

  hide() {
    this.isLoadingSubject.next(false);
  }

  updateMessage(message: string) {
    this.loadingMessageSubject.next(message);
  }
} 