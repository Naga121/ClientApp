import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/servive/authentication.service';
import { UserService } from 'src/app/servive/user.service';
import { loader } from '../loader/loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user?: User[];

  constructor(private userService: UserService,private authService:AuthenticationService,private loader:loader,private route: ActivatedRoute) { 
    if (this.authService.loggedIn()) { 
      this.loader.loader=true; 
      this.authService.getUserData().subscribe(res=>{
        if (res) {
          console.log(res);
          this.loader.loader=false; 
        }else{
          console.log(res);
          this.loader.loader=false; 
        }
      },err=>{
        if (err) {
          console.log('We got an data error :' +err);
        }
      });
    }
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
