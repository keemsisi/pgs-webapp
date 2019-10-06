import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CustomHttpServicesService } from '../services/custom-http-services.service';
import { CacheService } from '../services/cache.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-account-dashboard',
  templateUrl: './account-dashboard.component.html',
  styleUrls: ['./account-dashboard.component.css']
})
export class AccountDashboardComponent implements OnInit {

  staffCv : {} = {} ;
  
  constructor(private fb: FormBuilder, private httpRequest: CustomHttpServicesService,
    private messageService: MessageService, private cacheService: CacheService, private router: Router) {
  }

  ngOnInit() {
  }


  public fetchStaffCV(){
    //fetch the staff SpNo from the server 
    const data = of(fetch(this.cacheService.serverURL+"/bySpNo/" + this.cacheService.SpNo))
  }

}
