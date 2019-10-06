import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPaswwordComponent } from '../forgot-paswword.component';

const routes: Routes = [
  { path: 'forgot-password', component: ForgotPaswwordComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotPaswwordRoutingModule { }
