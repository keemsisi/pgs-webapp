import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditCvComponent } from '../edit-cv.component';

const routes: Routes = [
  {path : 'view-edit-cv' , component : EditCvComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditCvModRoutingModule { }
