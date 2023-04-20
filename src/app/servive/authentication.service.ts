import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, Observer, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { GlobalUrl } from '../utils/global-url';
import { UserService } from './user.service'; 

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public token:any='';

  constructor(private router: Router,private http: HttpClient,private apiService:UserService) { 
    this.token = localStorage.getItem('currentUser');
  }
  


  register(user: User) {
    return new Observable((observer: Observer<any>)=>{
      this.apiService.callPostApi(`${GlobalUrl.signUpUrl}`,user,{}).subscribe(res=>{
        observer.next(res);
      },error=>{
        observer.error(error)
      });
    });
  }

  login(payload:any){
    return new Observable((observer: Observer<any>)=>{
      this.apiService.callPostApi(`${GlobalUrl.loginUrl}`,payload,{}).subscribe(res=>{
        observer.next(res);
      },error=>{
        observer.error(error)
      });
    });
  }

  getToken() {
    return localStorage.getItem('currentUser');
  }

  loggedIn(): boolean {
    let authToken = localStorage.getItem('currentUser');
    return authToken !== null ? true : false;
  }

  resendEmail(payload:any){
    return new Observable((observer: Observer<any>)=>{
      this.apiService.callPostApi(`${GlobalUrl.resendEmail}`,payload,{}).subscribe(res=>{
        observer.next(res);
      },error=>{
        observer.error(error)
      });
    });
  }
  verifyEmail(payload:any){
    return new Observable((observer: Observer<any>)=>{
      this.apiService.callPostApi(`${GlobalUrl.verifyEmail.replace('{id}', payload.id)}`,{},{}).subscribe(res=>{
        observer.next(res);
      },error=>{
        observer.error(error)
      });
    });
  }

  getUserData(){
    let headers = new HttpHeaders({
      'Content-Type':'application/json',
      'Authorization':'Bearer  '+this.token
    });
    return new Observable((observer:Observer<any>)=>{
      this.apiService.callGetApi(`${GlobalUrl.getUserData}`,{},{headers:headers}).subscribe(res=>{
        observer.next(res);
      },error=>{
        observer.error(error)
      })
    })

  }

  // getUserProfile(id:any){
  //   let headers= new HttpHeaders({
  //     'Content-Type':'application/json',
  //     'Authorization':'Bearer '+this.token
  //   });
  //   return this.http.get(`${this._apiUrl}/getuser/${id}`,{headers:headers}).pipe(map(res=>{
  //     return res || null;
  //   }),
  //   catchError(this.handleError)
  //   )
  // }

  logout() { 
    let removeToken=localStorage.removeItem('currentUser');
    if (removeToken == null) {
      this.router.navigate(['/login']);
    }
  }


  handleError(error:HttpErrorResponse){
    let msg='';
    if (error.error instanceof ErrorEvent) {
      msg=error.error.message;
    } else {
      msg=`Error Code : ${error.status} \n Message : ${error.message} `
    }
    return throwError(msg)
  }


}
