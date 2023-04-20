import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './healpers/jwt.interceptor';
import { ErrorInterceptor } from './healpers/error.interceptor';
import { LoaderComponent } from './components/loader/loader.component';
import { loader } from './components/loader/loader';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { UserService } from './servive/user.service';
import { AuthenticationService } from './servive/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    RegistrationComponent,
    PagenotfoundComponent,
    LoaderComponent,
    VerifyEmailComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule, 
    AppRoutingModule,
  ],
  providers: [loader,UserService,AuthenticationService,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
