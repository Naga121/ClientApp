import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'; 
import { catchError, map, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _apiUrl=environment.apiUrl;
  currentUser = {}; 
  token: string | null='';

  constructor(private http: HttpClient) { 
    this.token = localStorage.getItem('currentUser')
  }

  // getAllUsers() {
  //   return this.http.get(`${this._apiUrl}/getallbrands`).pipe(map(res=>{
  //     return res || null;
  //   }),
  //     catchError  (this.handleError)
  //   );
  // }

  callPostApi(apiUrl: string, body: any, options:any) {
    return this.http.post(apiUrl, body, {}).pipe(
      tap(
        data => data,
        error => error
      ));
  }
  callGetApi(apiUrl: string, body: any, options:any) {
    return this.http.post(apiUrl, body, {}).pipe(
      tap(
        data => data,
        error => error
      ));
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
