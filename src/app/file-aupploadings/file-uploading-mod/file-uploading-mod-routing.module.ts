import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadGuard } from 'src/app/guard/file-upload.guard';
import { FileAupploadingsComponent } from '../file-aupploadings.component';

const routes: Routes = [
  {'path' : 'fileuploads/:spNumber' , component:FileAupploadingsComponent , canActivate: [FileUploadGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileUploadingModRoutingModule { }
