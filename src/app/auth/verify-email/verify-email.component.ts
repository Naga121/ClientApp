import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loader } from 'src/app/components/loader/loader';
import { AuthenticationService } from 'src/app/servive/authentication.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  isVerify:boolean | any = false;

  constructor(private authService: AuthenticationService, private route: ActivatedRoute,private loader:loader) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    this.verifyMail(param);
  }

  verifyMail(id:any){
    const payload = {
      id:id
    };
    this.loader.loader=true;
    this.authService.verifyEmail(payload).subscribe(res=>{
      this.isVerify = true;
      console.log(res);
      this.loader.loader=false;
    },(error) => { 
      console.log(error);
      this.loader.loader=false;
    });
  }

}
