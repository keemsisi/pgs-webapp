import { Component, OnInit } from '@angular/core';
import { CustomHttpServicesService } from '../servies/custom-http-services.service';
import { FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-paswword',
  templateUrl: './forgot-paswword.component.html',
  styleUrls: ['./forgot-paswword.component.css']
})
export class ForgotPaswwordComponent implements OnInit {

  accountEmail: FormControl = new FormControl('', {
    validators: [Validators.required, Validators.email]
  });
  show1: Boolean = true;
  show2: Boolean = false;

  constructor(private customHttp: CustomHttpServicesService, private messageService: MessageService) { }

  ngOnInit() {
    
  }


  public processForgotPasswordLink() {

    this.customHttp.sendPasswordResetLink(this.accountEmail.value).subscribe(

      data => {

        // let message = data.message; 

        console.table("DATA", data);

        // this.customCache.registrationSuccessful = true;
        if (data.linkGenerated) {

          this.messageService.add({ severity: 'success', summary: "Link Sent Successfully", detail: data.message });

          this.show2 = true;
          this.show1 = false;

        }

      },

      (error: HttpErrorResponse) => {

        if (error.status == 404 ) {
          this.messageService.add({ severity: 'error', summary: "Email Not Recognised ", detail: "The email address does not exit. Please provide a valid email" });
          // //console.log(error.error);
        }else {
          this.messageService.add({ severity: 'error', summary: "Server Error", detail: error.error.errorMsg });
          //console.log(error.status);
        }


      });

  }



}
