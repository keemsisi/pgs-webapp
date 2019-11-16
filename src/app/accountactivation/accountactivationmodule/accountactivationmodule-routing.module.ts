import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountactivationComponent } from '../accountactivation.component';


const routes: Routes = [ {
  path: 'activate' , component : AccountactivationComponent 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountactivationmoduleRoutingModule { }
