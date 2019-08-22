import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';



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
    BrowserModule, AppRoutingModule,
    AppRoutingModule,
    MatPasswordStrengthModule.forRoot(),
    RouterModule.forRoot(appRoute, { useHash: true }),
    MatButtonModule, MatSidenavModule, MatStepperModule, MatCardModule, MatFormFieldModule, MatCardModule
    , MatCheckboxModule, ReactiveFormsModule, FormsModule, MatOptionModule, MatSelectModule, MatDatepickerModule,
    MatDatepickerModule, MatRadioModule, MatNativeDateModule, MatInputModule,
    SignaturePadModule, MatRadioModule, BrowserAnimationsModule, MatToolbarModule, MatListModule, MatTableModule, MatProgressSpinnerModule,
    MatIconModule, FileUploadModule, HttpClientModule, MatExpansionModule, MessagesModule, ToastModule,
    MatPasswordStrengthModule, DataTableModule, DialogModule,
    ButtonModule, ConfirmDialogModule, ToggleButtonModule, GrowlModule, CalendarModule, InputTextModule, RadioButtonModule
  ],
  providers: [MessageService, CacheService, ConfirmationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

