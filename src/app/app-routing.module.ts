import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PgsHomeLandingComponent } from './pgs-home-landing/pgs-home-landing.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { PreviewCvComponent } from './preview-cv/preview-cv.component';
import { EditCvComponent } from './edit-cv/edit-cv.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { AdminComponent } from './admin/admin.component';
import { PredatoryJournalsComponent } from './predatory-journals/predatory-journals.component';
import { CvDocumentationStageComponent } from './cv-documentation-stage/cv-documentation-stage.component';
import { CvDocumentationModModule } from './cv-documentation/cv-documentation-mod/cv-documentation-mod.module';
import { PgsHomeLandingModModule } from './pgs-home-landing/pgs-home-landing-mod/pgs-home-landing-mod.module';
import { ContactAdministratorModModule } from './contact-administrator/contact-administrator-mod/contact-administrator-mod.module';
import { EditCvModModule } from './edit-cv/edit-cv-mod/edit-cv-mod.module';
import { FileUploadingModModule } from './file-aupploadings/file-uploading-mod/file-uploading-mod.module';
import { AsssessmentModModule } from './assesment/assessment/asssessment-mod/asssessment-mod.module';
import { ForgotPasswordModule } from './forgot-paswword/module/forgto-password-mod.module';
import { RegisterModule } from './register/module/register-mod.module';
import { LoginModule } from './login/module/login-mod.module';
import { AccountDashboardModModule } from './account-dashboard/account-dashboard-mod/account-dashboard-mod.module';
import { RegsuccessmoduleModule } from './regsuccess/regsuccessmodule/regsuccessmodule.module';
import { AccountactivationmoduleModule } from './accountactivation/accountactivationmodule/accountactivationmodule.module';
import { PasswordresetmoduleModule } from './passwordreset/passwordresetmodule/passwordresetmodule.module';

const appRoute: Routes = [

  { path: '', component: PgsHomeLandingComponent },

  {
    path: 'cv-documentation',
    loadChildren: () => import(
      './cv-documentation/cv-documentation-mod/cv-documentation-mod.module').then(M =>
        M.CvDocumentationModModule
      )
  },


  {
    path: 'login',
    loadChildren: () => import('./login/module/login-mod.module').then(M =>
      M.LoginModule
    )
  },



  {
    path: 'register',
    loadChildren: () => import('./register/module/register-routing-mod.module').then( 
      M => M.RegisterRoutingModule)
  },


  {
    path: 'forgot-password',
    loadChildren: () => import(
      './forgot-paswword/module/forgto-password-mod.module').then(
        M => M.ForgotPasswordModule
      ),
  },


  { path: 'cv-documentation-stage', component: CvDocumentationStageComponent },

  { path: 'preview-cv', component: PreviewCvComponent },

  { path: 'preview-cv/:spNumber', component: PreviewCvComponent },

  { path: 'admin-dashboard', component: AdminComponent },
  // {path : 'preview-cv' , component : PreviewCvComponent},


  {
    path: 'account-dashboard', loadChildren: () => import(
      './account-dashboard/account-dashboard-mod/account-dashboard-mod.module').then(
        M => M.AccountDashboardModModule
      ),
  },


  { path: 'cv-preview-edit', component: EditCvComponent },


  { path: 'quick-survey', component: SurveyFormComponent },

  {
    path: 'view-edit-cv',
    loadChildren: () => import(
      './edit-cv/edit-cv-mod/edit-cv-mod.module').then( 
        M => M.EditCvModModule)
    },

  {
    path: 'admin-contact',
    loadChildren: () => import(
      './contact-administrator/contact-administrator-mod/contact-administrator-mod.module').then( 
        M => M.ContactAdministratorModModule)
    },

  { path: 'predatory-journals', component: PredatoryJournalsComponent } ,

  {
    path: 'cv-assessment',
    loadChildren: () => import (
      './assesment/assessment/asssessment-mod/asssessment-mod.module').then( 
        M => M.AsssessmentModModule)
    },


  {
    path: 'regsuccess',
    loadChildren: () => import (
      './regsuccess/regsuccessmodule/regsuccessmodule.module').then( 
        M => M.RegsuccessmoduleModule)
    },
  {
    path: 'activate',
    loadChildren: () => import (
      './accountactivation/accountactivationmodule/accountactivationmodule.module').then( 
        M => M.AccountactivationmoduleModule)
    },

  {
    path: 'password-reset',
    loadChildren: () => import (
      './passwordreset/passwordresetmodule/passwordresetmodule.module').then( 
        M => M.PasswordresetmoduleModule)
    },
  { path: '**', component: PagenotfoundComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(appRoute, { useHash: true })],
  exports: [
    
    RouterModule,
    CvDocumentationModModule,
    PgsHomeLandingModModule,
    ContactAdministratorModModule,
    EditCvModModule,
    FileUploadingModModule, 
    AsssessmentModModule,
    ForgotPasswordModule, 
    LoginModule,
    RegisterModule,
    AccountDashboardModModule,
    RegsuccessmoduleModule,
    AccountactivationmoduleModule,
    ForgotPasswordModule,
    PasswordresetmoduleModule

  ]
})


export class AppRoutingModule { }
