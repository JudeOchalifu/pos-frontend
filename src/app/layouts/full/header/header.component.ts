import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { TablerIconsModule } from 'angular-tabler-icons';
import { MaterialModule } from 'src/app/material.module';
import {Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatBadgeModule } from '@angular/material/badge';
import {AuthenticationService} from "../../../services/authentication.service";

@Component({
    selector: 'app-header',
    imports: [
        RouterModule,
        CommonModule,
        NgScrollbarModule,
        TablerIconsModule,
        MaterialModule,
        MatBadgeModule
    ],
    templateUrl: './header.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();

  constructor(
    private router: Router,
    private authService: AuthenticationService,
  ) {}


  doLogOut() {
    this.authService.doLogOut();
  }
}
