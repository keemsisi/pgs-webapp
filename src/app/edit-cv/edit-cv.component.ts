import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CacheService } from '../servies/cache.service';
import { Router } from '@angular/router';
import { CustomHttpServicesService } from '../servies/custom-http-services.service';

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
        username : new FormControl('' , [Validators.requiredTrue])
      });
    }

  ngOnInit() {
  }

}
