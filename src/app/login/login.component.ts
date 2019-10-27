import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';
import { CacheService } from '../services/cache.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomHttpServicesService } from '../services/custom-http-services.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  durationInSeconds = 5;
  message = '';
  loginForm : FormGroup ;


  constructor(private _snackBar: MatSnackBar,
    private messageService: MessageService, private cacheService: CacheService, private router: Router 
    , private fb : FormBuilder ,private customHttp : CustomHttpServicesService) { 
      this.loginForm = fb.group({
        spNumber : new FormControl( "", [Validators.required]),
        password : new FormControl( "", [Validators.required]),
      })
    }






  public signIn() {

    this.customHttp.grantUserLogin(

      this.loginForm.get('spNumber'),this.loginForm.get('password')).subscribe(

      function(vdata){

        this.message = "Registeration was successful, please check your email to confirm activate your account!";

        this.messageService.add({ severity: 'success', summary: this.message, detail: "Successful" });

        this.router.navigate(['/regsuccess']).catch(function(reason){

          console.table(reason);

        })
        

      }),(error : HttpErrorResponse)=> {

        this.messageService.add({ severity: 'info', summary: this.message, detail: "Retryinh to login" });

        setTimeout(function(){

          this.registerNewAccount();

        },2000);
        
    }

    this.message = "Account authenticated successfully!";
    this.messageService.add({ severity: 'info', summary: this.message, detail: "Successful" });
    this._snackBar.openFromComponent(CustomSnackBar, {
      duration: this.durationInSeconds * 100,
    });

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
