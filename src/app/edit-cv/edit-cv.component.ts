import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CacheService } from '../services/cache.service';
import { Router } from '@angular/router';
import { CustomHttpServicesService } from '../services/custom-http-services.service';

@Component({
  selector: 'app-edit-cv',
  templateUrl: './edit-cv.component.html',
  styleUrls: ['./edit-cv.component.css']
})
export class EditCvComponent implements OnInit {
  form: FormGroup ;
  constructor(private fb: FormBuilder, private httpRequest: CustomHttpServicesService,
    private messageService: MessageService, private cacheService: CacheService, private router: Router) {
      this.form = this.fb.group({
        SpNo : new FormControl('' , [Validators.requiredTrue])
      });
    }

  ngOnInit() {
  }

}
