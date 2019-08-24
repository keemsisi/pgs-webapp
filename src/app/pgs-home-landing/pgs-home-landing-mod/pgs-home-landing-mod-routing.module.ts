import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PgsHomeLandingComponent } from '../pgs-home-landing.component';

const routes: Routes = [
  { path: '', component: PgsHomeLandingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PgsHomeLandingModRoutingModule { }
