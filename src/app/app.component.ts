import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './models/user';
import { AuthenticationService } from './servive/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor( private router: Router, private authService: AuthenticationService){
    if (this.authService.loggedIn()) { 
      this.router.navigate(['/dashboard']);
    }
  }




  logout() {
    this.authService.logout();
  }
}
