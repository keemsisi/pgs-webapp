import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordresetComponent } from '../passwordreset.component';


const routes: Routes = [
  {path : 'password-reset' , component : PasswordresetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PasswordresetmoduleRoutingModule { }
