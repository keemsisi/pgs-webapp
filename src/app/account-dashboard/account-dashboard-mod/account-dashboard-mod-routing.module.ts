import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDashboardComponent } from '../account-dashboard.component';
import { LoginGuard } from 'src/app/login.guard';

const routes: Routes = [
  {
    path: "account-dasboard",
    component: AccountDashboardComponent,
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountDashboardModRoutingModule { }
