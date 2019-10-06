import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssesmentComponent } from '../../assesment.component';

const routes: Routes = [
  {path: 'cv-assessment' , component : AssesmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AsssessmentModRoutingModule { }
