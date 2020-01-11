import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomHttpServicesService } from '../services/custom-http-services.service';
import { CacheService } from '../services/cache.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DataObjectModel } from '../models/object.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css']
})
export class AccountDashboardComponent implements OnInit {

  results  = {} ;
  postOnPromotion : any ;

  constructor(private fb: FormBuilder, private httpRequest: CustomHttpServicesService,
    private messageService: MessageService, private cacheService: CacheService, private router: Router) {
      console.log(JSON.parse(window.localStorage.getItem('personalInformation'))['postOnPromotion'])
    this.postOnPromotion = JSON.parse(window.localStorage.getItem('personalInformation')).postOnPromotion;
    if (typeof this.cacheService.spNumber == 'undefined') {
      this.cacheService.payloadData = JSON.stringify(new DataObjectModel().model);
      // console.log("DATA MODEL " + this.cacheService.payloadData.toString());
    } else {
      // ... fetch from the database and display
      console.log("NO");
    }
  }

  ngOnInit() {
  }


  public fetchStaffCV() {
    //fetch the staff spNumber from the server 
    const data = of(fetch(this.cacheService.serverURL + "/byspNumber/" + this.cacheService.spNumber))
  }

  public logout() {
    const ms = this.messageService;
    this.router.navigate(['/login']).catch(function () {
      window.localStorage.setItem('loggedIn', 'false');
      ms.add({ severity: 'error', summary: "Server Error ", detail: "Could not logout..." });
    })
  }



   gradeCV() {
    //fetch the staff spNumber from the server 
    console.log("Grading now")
    this.httpRequest.gradeUserCV(window.localStorage.getItem('spNumber')).subscribe(data => {
      console.log(data.grades)
      this.results = data.grades ;
      this.messageService.add({ severity: 'success', summary: "Grading was successful", detail: data.message });
      // const router = this.router;
    }, (error: HttpErrorResponse) => {
      console.error("ERROR_STATUS  ::: " + error.status);
      console.error("ERROR_MESSAGE ::: " + error.message);
      this.messageService.add({ severity: 'success', summary: "Error occured while grading", detail: error.message });
    })

  }

}
