import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { AuthService } from './services/auth.service';
import { AuthGuardGuard } from './services/auth-guard.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },
  {
    path: '', component: DashboardComponent,
    children: dashboardRoutes, canActivate: [AuthGuardGuard]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
