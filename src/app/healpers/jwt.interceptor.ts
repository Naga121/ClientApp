import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../servive/authentication.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let authToken:any = this.authService.getToken();
    if (authToken){
      request = request.clone({
        setHeaders: {
          Authorization: `${authToken}`
        }
      });
    }
    return next.handle(request);
  }
}
