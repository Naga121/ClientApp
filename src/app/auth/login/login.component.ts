import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { loader } from 'src/app/components/loader/loader';
import { AuthenticationService } from 'src/app/servive/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup|any;
  loading = false;
  submitted:boolean = false;
  error = '';
  inputType:string='password';
  returnUrl!: string;

  constructor(private formBuilder:FormBuilder,private router: Router, private authService: AuthenticationService,private loader:loader) { }

 
  showPassword(event:any){
    if(event.target.checked){
      this.inputType='text'
    }else{
      this.inputType='password';
    }
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',{ validators: [Validators.required, Validators.email] }],
      password: ['',{ validators: [Validators.required] }]
    });
  }

  get f() { 
    return this.loginForm.controls; 
  }

  onSubmit(){
    this.error = '';
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    } 
    const payload = {
      email: this.loginForm.value.email.trim(),
      password: this.loginForm.value.password.trim()
    }; 
    this.loader.loader=true;
    this.authService.login(payload).subscribe( res =>{
      if (res) {
        localStorage.setItem('currentUser',res['data']['token'])
        this.router.navigate(['dashboard']);
      }
      this.loader.loader=true; 
    },err=>{
      if (err.error) {
        this.error=err.message;
        alert('Please verify user email id'); 
      }
      this.loader.loader=false; 
    });
  }

  resendMail() {
    const payload = {
      email: this.loginForm.value.email.trim(),
    };
    this.authService.resendEmail(payload).subscribe(res=>{
      alert('Verification mail has been sent.Please verify your account.');
    }, (error) => {
      console.log(error);
    });
  }

}
