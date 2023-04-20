import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { loader } from 'src/app/components/loader/loader';
import { AuthenticationService } from 'src/app/servive/authentication.service';
import { CustomvalidationService } from 'src/app/servive/customvalidation.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  form: FormGroup|any;
  submitted:boolean = false;
  inputType:string='password';
  error:any='';
  
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService,private loader:loader,private customValidator:CustomvalidationService) { 
    this.form = this.formBuilder.group({
      username: ['',[Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.compose([Validators.required, this.customValidator.patternValidator()])],
      confirmpassword: ['',[Validators.required]]
    },
    {
      validator:this.customValidator.MatchPassword('password','confirmpassword')
    });
  }

   showPassword(event:any){
    if(event.target.checked){
      this.inputType='text'
    }else{
      this.inputType='password';
    }
  }

  ngOnInit(): void {
  }

  get f() { 
    return this.form.controls; 
  }

  onSubmit(){
    this.error='';
    this.submitted = true;
    this.loader.loader=true;
    if (this.form.invalid) {
        return;
    }
    const payload = {
      username:this.form.value.username,
      email:this.form.value.email.trim(),
      password: this.form.value.password.trim(),
      confirmpassword: this.form.value.confirmpassword.trim(),
    }
    this.authService.register(payload).pipe(first()).subscribe(res=>{ 
      if (res){
        alert('Your account has been created.Verification mail has been sent.Please verify your account.');
        this.router.navigate(['/login']);
        this.loader.loader=false;
      }
    },err=>{
      if (err) {
        console.log('We got an registration error :' +err);
        this.loader.loader=false;
      }
    });
  }

}
