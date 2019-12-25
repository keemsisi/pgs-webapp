import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomHttpServicesService } from '../services/custom-http-services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { CacheService } from '../services/cache.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  spNumberCond: Boolean = false;

  emailCond: Boolean = false;

  mismatched : Boolean = false;

  registerForm: FormGroup;

  allFieldsValid : Boolean = false ;

  focus : boolean = false ;

  focus1 : boolean = false ;
  

  constructor(private fb: FormBuilder, private router: Router, private customHttp: CustomHttpServicesService,

    private customCache: CacheService,

    private messageService: MessageService) {

    this.registerForm = fb.group({

      email: new FormControl("", [Validators.required, Validators.email]),

      spNumber: new FormControl("", [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*[0-9]*'))]),

      password: new FormControl("", [Validators.required]),

      confirmPassword: new FormControl("", [Validators.required])

    });


    /**
     * Check if the sp Number has already being registered or not 
     */
    this.registerForm.get('spNumber').valueChanges.subscribe(data => {

      this.customHttp.checkspNumber(this.registerForm.get('spNumber').value).subscribe(

        dat => {

          if (dat.exists) {

            this.spNumberCond = true;

          } else {

            this.spNumberCond = false;
          }

        }

      );

    });


    /**
     * Check if the email exists or not before registring 
     */
    this.registerForm.get('email').valueChanges.subscribe(data => {

      this.customHttp.checkEmail(this.registerForm.get('email').value).subscribe(

        dat => {

          if (dat.exists) {

            this.emailCond = true;

          } else {

            this.emailCond = false;

          }

        }

      );
    });

    this.registerForm.get('confirmPassword').valueChanges.subscribe(data => {
      if (data !== this.registerForm.get('password').value) {
        this.mismatched = true ;
      }else {
        this.mismatched = false ;
      }
    });
  }

  ngOnInit() {

  }

  public registerNewAccount() {
    console.log(this.registerForm.value)

    this.customHttp.registerNewUser(this.registerForm.value).subscribe(

      data => {

        // let message = data.message; 

        console.table("DATA", data)

        this.messageService.add({ severity: 'success', summary: "Registration Successfull", detail: data.message });

        //redirect the user to the registration successful page 
        setTimeout(() => {

          this.customCache.registrationSuccessful = true;

          this.router.navigate(['/regsuccess']).catch(function (reason) {

            console.table(reason);

          })

        }, 1000);

      }), (error: HttpErrorResponse) => {

        this.messageService.add({ severity: 'error', summary: "Server Error ", detail: "Failed to connect with the server." });


        setTimeout(function () {

          this.registerNewAccount();

        }, 1000);

      }

  }

  public sendNewAccountInformation() {

    this.router.navigate(['/register']).catch(function (reason) {

      console.table(reason);

    })

  }

}
