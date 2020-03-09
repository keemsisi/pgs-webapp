import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';
import { CacheService } from '../services/cache.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomHttpServicesService } from '../services/custom-http-services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DataObjectModel } from '../models/object.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  durationInSeconds = 5;

  message = '';

  loginForm: FormGroup;

  focus: boolean = false;
  focus1: boolean = false;


  constructor(private _snackBar: MatSnackBar,

    private messageService: MessageService, private cacheService: CacheService, private router: Router

    , private fb: FormBuilder, private customHttp: CustomHttpServicesService) {

    this.loginForm = fb.group({

      spNumber: new FormControl("", [Validators.required]),

      password: new FormControl("", [Validators.required]),

    });


    this.cacheService.loggedIn = false;

    window.localStorage.setItem('loggedIn', 'false'); // 


    this.cacheService.spNumber = "";

    this.cacheService.password = "";


  }


  public signIn() {

    this.customHttp.grantUserLogin(

      this.loginForm.get('spNumber').value, this.loginForm.get('password').value).subscribe(

        vdata => {

          //console.log(vdata);


          if (vdata.valid && vdata.activated) {


            this.cacheService.loggedIn = true;

            window.localStorage.setItem('loggedIn', 'true');
            window.localStorage.setItem('spNumber', this.loginForm.get('spNumber').value);

            //load the data inside the local storage to make it accessible for the preview and the cv editing tab 
            if ( vdata.cv != 'undefined' && vdata.cv != null ) {

              // //console.log("################################################################################")
              // //console.log(vdata.cv.masterFormGroupings);
              // //console.log(vdata.cv.personalInformation);
              // //console.log(vdata.cv.info);
              // //console.log(vdata.cv.eaphni);
              // //console.log("################################################################################")
              window.localStorage.setItem('personalInformation', JSON.stringify(vdata.cv.personalInformation));
              window.localStorage.setItem('info', JSON.stringify(vdata.cv.info));
              window.localStorage.setItem('eaphni', JSON.stringify(vdata.cv.eaphni));
              window.localStorage.setItem('masterFormGroupings', JSON.stringify(vdata.cv.masterFormGroupings));
              // //console.log('masterFormGroupings', vdata.cv.masterFormGroupings.dateAndSignature.base64image);
              window.localStorage.setItem('postOnPromotion' , vdata.cv.personalInformation.postOnPromotion);

            }

            else {
              const tempData = new DataObjectModel().model;
              window.localStorage.setItem('personalInformation', JSON.stringify(tempData.personalInformation));
              window.localStorage.setItem('info', JSON.stringify(tempData.info));
              window.localStorage.setItem('eaphni', JSON.stringify(tempData.eaphni));
              window.localStorage.setItem('masterFormGroupings', JSON.stringify(tempData.masterFormGroupings));
            }


            this.messageService.add({ severity: 'success', summary: "Authentication Granted Successfully", detail: vdata.message });

            const router = this.router;

            setTimeout(function () {

              router.navigate(['/account-dashboard']).catch(function (reason) {

                console.table(reason);

              });

            }, 2000)



          }


          else if (vdata.valid == false && vdata.activated == false) {

            this.messageService.add({ severity: 'error', summary: " Credentials Mismatched and Account not Activated ", detail: vdata.message });

          }

          else if (vdata.valid == true && vdata.activated == false) {

            this.messageService.add({ severity: 'info', summary: "Credentials Matched and Account not Activated ", detail: vdata.message });

          }

          else if (vdata.valid == false && vdata.activated == true) {

            this.messageService.add({ severity: 'error', summary: "Authentication Denied", detail: vdata.message });

          }


          else if (vdata.valid == false) {

            this.messageService.add({ severity: 'error', summary: "Authentication Denied", detail: vdata.message });

          }



        }, (error: HttpErrorResponse) => {

          console.table(error);

          this.messageService.add({ severity: 'error', summary: this.message, detail: "Retrying to login" });

          const recall = this.signIn;

          setTimeout(function () {

            recall();

          }, 2000);
        }
      );

  }

  ngOnInit() {

  }

  saveCredentials( event : Event ) {
    //console.log(event)
    window.localStorage.setItem('username' , this.loginForm.get('username').value);
    window.localStorage.setItem('password' , this.loginForm.get('password').value);
  }

}


// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styles: [`
//     .snack {
//       color: hotpink;
//     }
//   `],
// })
// export class CustomSnackBar { }
