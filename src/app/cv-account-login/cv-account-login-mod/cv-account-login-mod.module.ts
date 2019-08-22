import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CvAccountLoginModRoutingModule } from './cv-account-login-mod-routing.module';
import { CvAccountLoginComponent } from '../cv-account-login.component';

@NgModule({
  declarations: [
    CvAccountLoginComponent
  ],
  imports: [
    CommonModule,
    CvAccountLoginModRoutingModule
  ]
})
export class CvAccountLoginModModule { }
