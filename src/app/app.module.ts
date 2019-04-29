import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';
import {CvDocumentationComponent} from './cv-documentation/cv-documentation.component';
import {PGSHomeComponent} from './pgs-home/pgs-home.component';
import {HomeComponent} from './home/home.component';
import {PagenotfoundComponent} from './pagenotfound/pagenotfound.component';
import {RouterModule} from '@angular/router';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule } from '@angular/common/http';




import {
  MatButtonModule, MatFormFieldModule,
  MatCardModule, MatStepperModule,
  MatSidenavModule, MatCheckboxModule,
  MatOptionModule, MatSelectModule, MatInputModule,
  MatDatepickerModule, MatRadioModule,
  MatNativeDateModule, MatIconModule,
  MatExpansionModule
} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    CvDocumentationComponent,
    PGSHomeComponent,
    HomeComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path : '' , component : PGSHomeComponent} ,
      {path : 'cv-documentation' , component : CvDocumentationComponent},
      {path : '**' , component : PagenotfoundComponent}
    ]),
    MatButtonModule, MatSidenavModule, MatStepperModule, MatCardModule, MatFormFieldModule, MatCardModule
    , MatCheckboxModule, ReactiveFormsModule, FormsModule, MatOptionModule, MatSelectModule, MatDatepickerModule,
    MatDatepickerModule, MatRadioModule, MatNativeDateModule , MatInputModule,
    SignaturePadModule, MatRadioModule, BrowserAnimationsModule,
    MatIconModule, FileUploadModule, HttpClientModule, MatExpansionModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
