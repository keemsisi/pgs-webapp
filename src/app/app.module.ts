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
import {RouterModule, Routes} from '@angular/router';
import {HttpClientModule } from '@angular/common/http';

// import {FlexLayoutModule} from '@angular/flex-layout';

/***Primeng Modules are here*/
import {MessagesModule} from 'primeng/messages';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';






import {
  MatButtonModule, MatFormFieldModule,
  MatCardModule, MatStepperModule,
  MatSidenavModule, MatCheckboxModule,
  MatOptionModule, MatSelectModule, MatInputModule,
  MatDatepickerModule, MatRadioModule,
  MatNativeDateModule, MatIconModule,
  MatExpansionModule,
  MatToolbarModule,
  MatListModule,MatTableModule , MatProgressSpinnerModule ,
} from '@angular/material';
import { CacheService } from './servies/cache.service';
import { LoginCredentialsComponent } from './login-credentials/login-credentials.component';
import { PgsHomeLandingComponent } from './pgs-home-landing/pgs-home-landing.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FileAupploadingsComponent } from './file-aupploadings/file-aupploadings.component';
import { FileUploadGuard } from './guard/file-upload.guard';
import { PreviewCvComponent } from './preview-cv/preview-cv.component';
import { CvAccountLoginComponent } from './cv-account-login/cv-account-login.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { LoginGuard } from './login.guard';
import { EditCvComponent } from './edit-cv/edit-cv.component';
import { LoginComponent } from './login/login.component';
import { SearchCvComponent } from './search-cv/search-cv.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { ContactAdministratorComponent } from './contact-administrator/contact-administrator.component';

// import {
// } from 'primeng';


import {
  DataTableModule, DialogModule, RadioButtonModule ,
  ButtonModule, ConfirmDialogModule,  ToggleButtonModule,
  ConfirmationService , GrowlModule, CalendarModule, InputTextModule

} from 'primeng/primeng';
import { AdminComponent } from './admin/admin.component';
import { PgsHeaderComponent } from './pgs-header/pgs-header.component';
import { FooterComponent } from './footer/footer.component';
import { PredatoryJournalsComponent } from './predatory-journals/predatory-journals.component';
import { CvDocumentationStageComponent } from './cv-documentation-stage/cv-documentation-stage.component';
import { AssesmentComponent } from './assesment/assesment.component';

const appRoute: Routes = [
    {path : '' , component : PgsHomeLandingComponent },
    {path : 'cv-documentation/:username' , component : CvDocumentationComponent},
    {path : 'cv-documentation' , component : CvDocumentationComponent},
    {path : 'cv-documentation-stage' , component : CvDocumentationComponent},
    {path : 'preview-cv' , component : PreviewCvComponent},
    {path : 'preview-cv/:username' , component : PreviewCvComponent},
    {path : 'admin-dashboard' , component : AdminComponent },
    // {path : 'preview-cv' , component : PreviewCvComponent},
    {path : 'login' , component : LoginCredentialsComponent},
    {path : 'dashboaracceptedDated' , component : AccountDashboardComponent , canActivate : [LoginGuard] , children : [
    ]},
    {path : 'cv-preview-edit' , component : EditCvComponent } ,
    {path : 'quick-survey' , component : SurveyFormComponent } ,
    {path : 'fileuploads/:username' , component : FileAupploadingsComponent, canActivate : [FileUploadGuard]},
    {path : 'view-edit-cv' , component : FileAupploadingsComponent, canActivate : [FileUploadGuard]},
    {path : 'admin-contact' , component : ContactAdministratorComponent},
    {path : 'predatory-journals' , component : PredatoryJournalsComponent},
    {path : 'cv-assessment' , component : AssesmentComponent},
    {path : '**' , component : PagenotfoundComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    CvDocumentationComponent,
    PGSHomeComponent,
    HomeComponent,
    PagenotfoundComponent,
    LoginCredentialsComponent,
    PgsHomeLandingComponent,
    FileAupploadingsComponent,
    PreviewCvComponent,
    CvAccountLoginComponent,
    AccountDashboardComponent,
    EditCvComponent,
    LoginComponent,
    SearchCvComponent,
    SurveyFormComponent,
    AdminComponent,
    PgsHeaderComponent,
    FooterComponent,
    ContactAdministratorComponent,
    PredatoryJournalsComponent,
    CvDocumentationStageComponent,
    AssesmentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatPasswordStrengthModule.forRoot(),
    RouterModule.forRoot(appRoute , {useHash : true}),
    MatButtonModule, MatSidenavModule, MatStepperModule, MatCardModule, MatFormFieldModule, MatCardModule
    , MatCheckboxModule, ReactiveFormsModule, FormsModule, MatOptionModule, MatSelectModule, MatDatepickerModule,
    MatDatepickerModule, MatRadioModule, MatNativeDateModule , MatInputModule,
    SignaturePadModule, MatRadioModule, BrowserAnimationsModule, MatToolbarModule, MatListModule, MatTableModule,MatProgressSpinnerModule,
    MatIconModule, FileUploadModule, HttpClientModule, MatExpansionModule , MessagesModule , ToastModule,
    MatPasswordStrengthModule, DataTableModule, DialogModule,
    ButtonModule, ConfirmDialogModule,  ToggleButtonModule , GrowlModule, CalendarModule, InputTextModule, RadioButtonModule
  ],
  providers: [MessageService , CacheService , ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
 
