import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { delay, dematerialize, materialize, mergeMap, Observable, of, throwError } from 'rxjs';
import { User } from '../models/user';

const users:User[] = [{ _id: 1, username: 'test', email:'test@gmail.com', password: 'test@123',confirmpassword:'test@123' }];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {


  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const { url, method, headers, body } = request;
    
    return of(null).pipe(mergeMap(handleRoute)).pipe(materialize()).pipe(delay(500)).pipe(dematerialize());

    function handleRoute(): Observable<any> {
      switch (true) {
        case url.endsWith('/api/login') && method === 'POST':
          return authenticate();
        case url.endsWith('/api/getallbrandss') && method === 'GET':
          return getUsers();
        default: 
          return next.handle(request);
      }    
    }

    function authenticate(){
      const { email, password } = body;
      const user = users.find(x => x.email === email && x.password === password);
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        confirmpassword:user.confirmpassword,
        token: 'fake-jwt-token'
      })
    }

    function getUsers(){
      if (!isLoggedIn()) return unauthorized();
      return ok(users);
    }
    function ok(body?:any) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function error(message: string) {
      return throwError(() => ({ error: { message } }));
    }

    function unauthorized() {
      return throwError(() => ({ status: 401, error: { message: 'Unauthorised' } }));
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

  }
}

export let fakeBackendProvider = { 
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
