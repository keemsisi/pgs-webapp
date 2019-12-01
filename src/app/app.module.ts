import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {
  TreeTableModule, DialogModule, RadioButtonModule,
  ButtonModule, ConfirmDialogModule, ToggleButtonModule,
  ConfirmationService, GrowlModule, CalendarModule, InputTextModule

} from 'primeng/primeng';
import { AppRoutingModule } from './app-routing.module';

/***Primeng Modules are here*/
import { MessagesModule } from 'primeng/messages';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignaturePadModule } from 'angular2-signaturepad';
import { PGSHomeComponent } from './pgs-home/pgs-home.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';


import {
  MatButtonModule,
  MatFormFieldModule,
  MatCardModule,
  MatStepperModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatOptionModule,
  MatSelectModule,
  MatInputModule,
  MatDatepickerModule,
  MatRadioModule,
  MatNativeDateModule,
  MatIconModule,
  MatExpansionModule,
  MatToolbarModule,
  MatListModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatTabsModule,
  MatSnackBarModule,
} from '@angular/material';

import { CvDocumentationComponent } from './cv-documentation/cv-documentation.component';
// import { PagenotfoundComponent } from 'pagenotfound/pagenotfound.component';
import { PgsHomeLandingComponent } from './pgs-home-landing/pgs-home-landing.component';
import { FileAupploadingsComponent } from './file-aupploadings/file-aupploadings.component';
import { PreviewCvComponent } from './preview-cv/preview-cv.component';
import { CvAccountLoginComponent } from './cv-account-login/cv-account-login.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { EditCvComponent } from './edit-cv/edit-cv.component';
import { LoginComponent } from './login/login.component';
import { SearchCvComponent } from './search-cv/search-cv.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { AdminComponent } from './admin/admin.component';
import { PgsHeaderComponent } from './pgs-header/pgs-header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactAdministratorComponent } from './contact-administrator/contact-administrator.component';
import { PredatoryJournalsComponent } from './predatory-journals/predatory-journals.component';
import { CvDocumentationStageComponent } from './cv-documentation-stage/cv-documentation-stage.component';
import { AssesmentComponent } from './assesment/assesment.component';
import { CacheService } from './services/cache.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ForgotPaswwordComponent } from './forgot-paswword/forgot-paswword.component';
import { SunbmitCvComponent } from './sunbmit-cv/sunbmit-cv.component';
import { RegisterComponent } from './register/register.component';
import { RegsuccessComponent } from './regsuccess/regsuccess.component';
import { NonteachingstaffComponent } from './nonteachingstaff/nonteachingstaff.component';
import { AccountactivationComponent } from './accountactivation/accountactivation.component';
// import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { ScoringtableComponent } from './scoringtable/scoringtable.component';




@NgModule({
  declarations: [
    AppComponent,
    CvDocumentationComponent,
    PGSHomeComponent,
    HomeComponent,
    PagenotfoundComponent,
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
    AssesmentComponent,
    PagenotfoundComponent,
    ForgotPaswwordComponent,
    SunbmitCvComponent,
    RegisterComponent,
    RegsuccessComponent,
    NonteachingstaffComponent,
    AccountactivationComponent,
    // ForgotpasswordComponent,
    PasswordresetComponent,
    ScoringtableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatPasswordStrengthModule.forRoot(),
    MatButtonModule,
    MatSidenavModule,
    MatStepperModule,
    MatCardModule,
    MatFormFieldModule,
    MatCardModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    FormsModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatRadioModule,
    MatNativeDateModule,
    MatInputModule,
    SignaturePadModule,
    MatRadioModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FileUploadModule,
    HttpClientModule,
    MatExpansionModule,
    MessagesModule,
    ToastModule,
    MatPasswordStrengthModule,
    TreeTableModule,
    DialogModule,
    MatSnackBarModule,
    ButtonModule,
    ConfirmDialogModule,
    ToggleButtonModule,
    GrowlModule,
    MatTabsModule,
    CalendarModule,
    InputTextModule,
    RadioButtonModule,
  ],
  providers: [MessageService, CacheService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

