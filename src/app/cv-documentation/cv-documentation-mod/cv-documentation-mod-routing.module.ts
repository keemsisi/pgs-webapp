import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CvDocumentationComponent } from '../cv-documentation.component';

const routes: Routes = [
  { path: 'cv-documentation', component: CvDocumentationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CvDocumentationModRoutingModule { }
