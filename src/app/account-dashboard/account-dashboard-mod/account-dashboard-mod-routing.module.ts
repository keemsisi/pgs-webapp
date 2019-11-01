import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDashboardComponent } from '../account-dashboard.component';
import { LoginGuard } from 'src/app/login.guard';

const routes: Routes = [
  {
    path: "account-dashboard",
    component: AccountDashboardComponent,
    canActivate: [LoginGuard],
    canLoad : [LoginGuard],
    canActivateChild: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountDashboardModRoutingModule { 

}
