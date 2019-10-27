import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CvDocumentationComponent } from './cv-documentation/cv-documentation.component';

// import {FlexLayoutModule} from '@angular/flex-layout';
import { PgsHomeLandingComponent } from './pgs-home-landing/pgs-home-landing.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { FileAupploadingsComponent } from './file-aupploadings/file-aupploadings.component';
import { FileUploadGuard } from './guard/file-upload.guard';
import { PreviewCvComponent } from './preview-cv/preview-cv.component';
import { AccountDashboardComponent } from './account-dashboard/account-dashboard.component';
import { LoginGuard } from './login.guard';
import { EditCvComponent } from './edit-cv/edit-cv.component';
import { SurveyFormComponent } from './survey-form/survey-form.component';
import { ContactAdministratorComponent } from './contact-administrator/contact-administrator.component';

// import {
// } from 'primeng';



import { AdminComponent } from './admin/admin.component';
import { PredatoryJournalsComponent } from './predatory-journals/predatory-journals.component';
import { CvDocumentationStageComponent } from './cv-documentation-stage/cv-documentation-stage.component';
import { AssesmentComponent } from './assesment/assesment.component';
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

const appRoute: Routes = [

  { path: '', component: PgsHomeLandingComponent },
  // { path: 'cv-documentation/:SpNo', component: CvDocumentationComponent },


  {
    path: 'cv-documentation',
    loadChildren: () => import(
      './cv-documentation/cv-documentation-mod/cv-documentation-mod.module').then(
        function (module) {
          module.CvDocumentationModModule
        }
      )
  },


  {
    path: 'login',
    loadChildren: () => import('./login/module/login-mod.module').then(function (module) {
      module.LoginModule
    })
  },



  {
    path: 'register',
    loadChildren: () => import('./register/module/register-routing-mod.module').then(function (module) {
      module.RegisterRoutingModule
    })
  },


  {
    path: 'forgot-password',
    loadChildren: () => import(
      './forgot-paswword/module/forgto-password-mod.module').then(
        function (module) {
          module.ForgotPasswordModule
        }
      ),
  },


  { path: 'cv-documentation-stage', component: CvDocumentationStageComponent },

  { path: 'preview-cv', component: PreviewCvComponent },

  { path: 'preview-cv/:SpNo', component: PreviewCvComponent },

  { path: 'admin-dashboard', component: AdminComponent },
  // {path : 'preview-cv' , component : PreviewCvComponent},


  {
    path: 'account-dashboard', loadChildren: () => import(
      './account-dashboard/account-dashboard-mod/account-dashboard-mod.module').then(
        function (module) {
          module.AccountDashboardModModule
        }
      ),
  },


  { path: 'cv-preview-edit', component: EditCvComponent },


  { path: 'quick-survey', component: SurveyFormComponent },

  // {
  //   path: 'fileuploads/:SpNo',
  //   loadChildren: './file-aupploadings/file-uploading-mod/file-uploading-mod.module#FileUploadingModModule'
  //   , canActivate: [FileUploadGuard]
  // },

  {
    path: 'view-edit-cv',
    loadChildren: () => import(
      './edit-cv/edit-cv-mod/edit-cv-mod.module').then(
        function (module) {
          module.EditCvModModule
        }
      ),
  },

  {
    path: 'admin-contact',
    loadChildren: () => import(
      './contact-administrator/contact-administrator-mod/contact-administrator-mod.module').then(
        function (module) {
          module.ContactAdministratorModModule
        }
      ),
  },

  { path: 'predatory-journals', component: PredatoryJournalsComponent } ,

  {
    path: 'cv-assessment',
    loadChildren: () => import (
      './assesment/assessment/asssessment-mod/asssessment-mod.module').then(
        function (module) {
          module.AsssessmentModModule
        }
      )
  },


  {
    path: 'regsuccess',
    loadChildren: () => import (
      './regsuccess/regsuccessmodule/regsuccessmodule.module').then(
        function (module) {
          module.RegsuccessmoduleModule
        }
      )
  },

  // {
  //   path: 'regsuccess',
  //   loadChildren: () => import (
  //     './regsuccess/regsuccessmodule/regsuccessmodule.module').then(
  //       function (module) {
  //         module.RegsuccessmoduleModule
  //       }
  //     )
  // },

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
    RegsuccessmoduleModule

  ]
})


export class AppRoutingModule { }
