import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactAdministratorComponent } from '../contact-administrator.component';

const routes: Routes = [
  { path: 'admin-contact', component: ContactAdministratorComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactAdministratorModRoutingModule { }
