import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';
import { CacheService } from '../services/cache.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomHttpServicesService } from '../services/custom-http-services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { IfStmt } from '@angular/compiler';

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
    })
  }






  public signIn() {

    this.customHttp.grantUserLogin(

      this.loginForm.get('spNumber').value, this.loginForm.get('password').value).subscribe(

        vdata => {

          if (vdata.valid) {


            this.cacheService.loggedIn = true ;
            
            this.message = "Login was successful, please wait while you get access to your account";

            this.messageService.add({ severity: 'success', summary: "Successful", detail: this.message });

            this.router.navigate(['/account-dashboard']).catch(function (reason) {

              console.table(reason);

            });
            

          } else {

            console.log(vdata.valid);


            this.message = "Unauthorised access, username and password not correct. please enter correct account credentials";

            this.messageService.add({ severity: 'error', summary: "Invalid Credentials ", detail: this.message });

          }



        }), (error: HttpErrorResponse) => {

          console.table(error);

          this.messageService.add({ severity: 'error', summary: this.message, detail: "Retrying to login" });

          setTimeout(function () {

            this.registerNewAccount();

          }, 2000);
        }

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
