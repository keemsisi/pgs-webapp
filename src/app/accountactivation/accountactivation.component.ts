import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomHttpServicesService } from '../servies/custom-http-services.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-accountactivation',
  templateUrl: './accountactivation.component.html',
  styleUrls: ['./accountactivation.component.scss']
})
export class AccountactivationComponent implements OnInit {

  accountEmail: String = "None";
  accountSpNumber: String = "None";
  accountToken: String = "None";
  viewMessage: String = "None";

  show1: Boolean = false;
  show2: Boolean = false;
  show3: Boolean = false;
  show4: Boolean = false;


  showR: Boolean = false;


  constructor(
    private router: Router, private activatedRouter: ActivatedRoute,
    private customHttp: CustomHttpServicesService, private messageService: MessageService
  ) { }

  ngOnInit() {
    this.accountSpNumber = this.activatedRouter.snapshot.queryParams['spNumber'];
    this.accountEmail = this.activatedRouter.snapshot.queryParams['email'];
    this.accountToken = this.activatedRouter.snapshot.queryParams['token'];
    this.processAccountActivation();
  }


  public processAccountActivation() {

    this.customHttp.activateAccount(this.accountEmail, this.accountSpNumber, this.accountToken).subscribe(

      data => {

        // let message = data.message; 

        console.table("DATA", data)

        // this.customCache.registrationSuccessful = true;
        if (data.tokenExist === true && data.accountActivated === true) {

          this.messageService.add({ severity: 'success', summary: "Acccount Activation was Successful", detail: data.message });

          this.show1 = true;
          this.show2 = false;
          this.show3 = false;

        }

        else if (data.tokenExist === false || data.accountActivated == false) {

          this.show2 = true;
          this.show1 = false;
          this.show3 = false;

          this.showR = true;


          this.messageService.add({
            severity: 'error', summary: "Token Does not Exists",
            detail: data.message

          });

        }


        else if (data.accountActivated === true) {

          this.show3 = true;

          this.show1 = false;

          this.show2 = false;


          this.messageService.add({

            severity: 'info', summary: "Account already Activated",

            detail: "Your account has already been activated sometimes ago. Please continue go to the account login page."

          });

        }


      },

      (error: HttpErrorResponse) => {

        this.messageService.add({ severity: 'error', summary: "Server Error ", detail: "Failed to connect with the server." });


        setTimeout(function () {

          this.registerNewAccount();

        }, 1000);

      });

  }


  public sendActivation() {

    this.customHttp.sendAnotherLink(this.accountEmail, this.accountSpNumber).subscribe(

      data => {

        if (data.tokenGenrated) {

          //console.log(data);

          this.messageService.add({ severity: 'success', summary: "Account Activation Link", detail: "If your mail is registered on our system you will get a a link to activate your account" });

          this.show1 = false;
          this.show2 = false;
          this.show3 = false;
          this.show4 = true;
          
        }
      },

      (error: HttpErrorResponse) => {

        //console.log(error.message);

        this.messageService.add({ severity: 'error', detail: error.message, summary: "Error Occured While Sending Link" });

      }
    );
  }

}
