import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'POS Main';
}

// bootstrap AFTER the class declaration
bootstrapApplication(AppComponent, {
  providers: [provideAnimations(), provideToastr()]
});
