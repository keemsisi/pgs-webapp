import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';
import { CacheService } from '../services/cache.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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
    , private fb : FormBuilder) { 
      this.loginForm = fb.group({
        username : new FormControl( "", [Validators.required]),
        password : new FormControl( "", [Validators.required]),
      })
    }



  registerNewAccount() {
    this.message = "Registeration was successful, please check your email to confirm activate your account!";
    this.messageService.add({ severity: 'info', summary: this.message, detail: "Successful" });

    this._snackBar.openFromComponent(CustomSnackBar, {
      duration: this.durationInSeconds * 1000,
    });

  }


  signIn() {
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
