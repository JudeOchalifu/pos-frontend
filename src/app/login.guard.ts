import { CanActivateFn } from '@angular/router';


import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenticationService.getCurrentUserFromLocal()) {
      console.log('HAS USER===========================================================>')
      return true;
    } else {
      console.log('DOES NOT HAVE USER===========================================================>')
      this.router.navigate(['/authentication/login']);
      return false;
    }
  }

}
