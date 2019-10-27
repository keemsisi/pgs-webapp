import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegsuccessmoduleModule } from './regsuccessmodule.module';
import { RegsuccessComponent } from '../regsuccess.component';
import { RegsuccssgaurdGuard } from 'src/app/regsuccssgaurd.guard';


const routes: Routes = [
  {
  path :  "regsuccess" , 
  component : RegsuccessComponent , 
  canActivate : [RegsuccssgaurdGuard],
  canLoad : [RegsuccssgaurdGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegsuccessmoduleRoutingModule { }
