import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomvalidationService {

  patternValidator(): ValidatorFn {
    return (control: AbstractControl):any => {
      if (!control.value) {
        return null;
      }
      const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
      const valid = regex.test(control.value);
      return valid ? null : { invalidPassword: true };
    };
  }

  MatchPassword(password: any, confirmpassword: any) {
    return (formGroup:FormGroup): any| null=>{
      const pwdControl=formGroup.controls[password];
      const cmPwdControl=formGroup.controls[confirmpassword];
      if (!pwdControl || !cmPwdControl) {
        return null;
      }
      if (cmPwdControl.errors && !cmPwdControl.errors['passwordMismatch']) {
        return null;
      }
      if (pwdControl.value !== cmPwdControl.value) {
        cmPwdControl.setErrors({passwordMismatch:true});
      }else{
        cmPwdControl.setErrors(null);
      }
    }
  }

}
