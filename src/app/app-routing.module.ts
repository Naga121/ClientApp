import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './healpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegistrationComponent},
  { path: 'verify-email/:id', component: VerifyEmailComponent}, 
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path:'**',redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
