import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountDashboardComponent } from '../account-dashboard.component';
import { LoginGuard } from 'src/app/login.guard';

const routes: Routes = [
  {
    path: "account-dashboard",
    component: AccountDashboardComponent,
    // canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountDashboardModRoutingModule { 
  // constructor(){
  //   new Promise(function(resolve  , reject){
  //     resolve(3232323);
  //     reject(23232)
  //   }).then(function(value) {
  //     console.log(value)
  //     return value ;
  //   });
  // }
}
