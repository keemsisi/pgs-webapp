import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';
import { CacheService } from '../services/cache.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomHttpServicesService } from '../services/custom-http-services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';
import { func } from 'prop-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  durationInSeconds = 5;

  message = '';

  loginForm: FormGroup;


  constructor(private _snackBar: MatSnackBar,

    private messageService: MessageService, private cacheService: CacheService, private router: Router

    , private fb: FormBuilder, private customHttp: CustomHttpServicesService) {

    this.loginForm = fb.group({

      spNumber: new FormControl("", [Validators.required]),

      password: new FormControl("", [Validators.required]),

    });


    this.cacheService.loggedIn = false;

    this.cacheService.SpNo = "";

    this.cacheService.password = "";


  }


  public signIn() {

    this.customHttp.grantUserLogin(

      this.loginForm.get('spNumber').value, this.loginForm.get('password').value).subscribe(

        vdata => {

          console.log(vdata);

          if (vdata.valid && vdata.activated) {


            this.cacheService.loggedIn = true;

            this.message = "Login was successful, please wait while you get access to your account";

            this.messageService.add({ severity: 'success', summary: "Authentication Granted Successfully", detail: vdata.message });

            const router = this.router ;

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

}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    .snack {
      color: hotpink;
    }
  `],
})
export class CustomSnackBar { }
