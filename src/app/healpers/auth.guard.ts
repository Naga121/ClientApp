import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthenticationService } from '../servive/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private router: Router,private authService: AuthenticationService){}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot){ 
    if ( !localStorage.getItem('currentUser') ) {
      window.alert('Access not allowed!')
      this.router.navigate(['/login']);
    }
    return true;
  }
  
}
