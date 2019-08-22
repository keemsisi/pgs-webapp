import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CvAccountLoginComponent } from '../cv-account-login.component';

const routes: Routes = [
  {path : '' , component: CvAccountLoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CvAccountLoginModRoutingModule { }
