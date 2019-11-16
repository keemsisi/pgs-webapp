import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomHttpServicesService } from '../servies/custom-http-services.service';
import { MessageService } from 'primeng/api';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit {


  formGrp: FormGroup;




  emailParam: String = "";
  tokenParam: String = "";

  show1: Boolean = false;
  show2: Boolean = false;
  show3: Boolean = false;
  show4: Boolean = false;

  constructor(private fb: FormBuilder, private customHttp: CustomHttpServicesService, 
    private messageService: MessageService, private activatedRoute: ActivatedRoute , private router : Router) {

    this.formGrp = this.fb.group({
      accountEmail: new FormControl("", [Validators.email, Validators.required]),
      password: new FormControl("", [Validators.min(8), Validators.required]),
      confirmPassword: new FormControl("", [Validators.min(8), Validators.required])
    });


    this.emailParam = this.activatedRoute.snapshot.queryParams['email'];
    this.tokenParam = this.activatedRoute.snapshot.queryParams['token'];


    this.formGrp.get('accountEmail').setValue(this.emailParam)
    this.formGrp.get('accountEmail').disabled ;


    console.log(this.emailParam , this.tokenParam)
    this.verifyLink(this.emailParam, this.tokenParam);



  }

  ngOnInit() {
  }


  public resetAccountPassword() {

    this.customHttp.resetPassword(this.formGrp.value , this.emailParam , this.tokenParam).subscribe(

      data => {

        // let message = data.message; 

        console.table("DATA", data);

        // this.customCache.registrationSuccessful = true;
        if (data.reset) {

          this.messageService.add({ severity: 'success', summary: "Link Sent Successfully", detail: data.message });
          this.show1 = false;
          this.show2 = false;
          this.show3 = true;
          this.show4 = false;
        }else if(data.reset == false ){
          this.show1 = false;
          this.show2 = true;
          this.show3 = false;
          this.show4 = false;
        }

      },

      (error: HttpErrorResponse) => {
        if (error.status != 403) {
          this.show1 = false;
          this.show2 = false;
          this.show3 = false;
          this.show4 = true;
        }

        this.messageService.add({ severity: 'error', summary: "Server Error ", detail: error.error.errorMsg });  

      });

  }

  public verifyLink(email : String, token : String ) {

    this.customHttp.verifyResetPasswordLink( email , token ).subscribe(

      data => {

        // let message = data.message; 

        console.table("DATA", data);

        // this.customCache.registrationSuccessful = true;
        if (data.valid) {
          this.show1 = true;
        }else {
          this.show1 = false;
          this.show2 = true;
        }

      },

      (error: HttpErrorResponse) => {
        console.log(error)
        this.show4 = true;
        this.messageService.add({ severity: 'error', summary: "Server Error ", detail: error.error.errorMsg });
      
      });
  }


  forgotPassword(){
    this.router.navigate(['/forgot-password']).catch(function(reject){
      console.log(reject) ;
    })
  }

  login(){
      this.router.navigate(['/login']).catch(function(reject){
        console.log(reject) ;
      })
  }

}
