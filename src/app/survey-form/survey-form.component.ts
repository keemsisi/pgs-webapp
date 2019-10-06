import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CustomHttpServicesService } from '../services/custom-http-services.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {
  surveyGroup: FormGroup;

  constructor(private fb: FormBuilder, private customHttp: CustomHttpServicesService, private messageService: MessageService) {
    this.surveyGroup = this.fb.group({
      survey1: new FormControl('', Validators.required),
      survey2: new FormControl('', Validators.required),
      survey3: new FormControl('', Validators.required),
      survey4: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
  }

  submitSurvey() {
    // console.log(this.surveyGroup.value);
    this.customHttp.submitSurvey(this.surveyGroup.value).subscribe(e => {
      this.messageService.add({
        severity: 'success', 'closable': true,
        detail: 'Response Received ', summary: 'Your Survey was successful'
      });
      this.surveyGroup.setValue({ 'survey1': '', 'survey2': '', 'survey3': '', 'survey4': '' });
    }, (error: HttpErrorResponse) => {
      if (error.status === 500) {
        // console.log('Server side error occured please try again later');
      } else if (error.status === 404) {
        this.messageService.add({
          severity: 'success', 'closable': true,
          detail: 'Slight Issue', summary: 'Your Survey can not be processed now, please try again later'
        });
      } else {
        // console.log(error);
        this.messageService.add({
          severity: 'failure', 'closable': true,
          detail: 'Slight Issue', summary: 'Your Survey can not be processed now, please try again later'
        });
      }
    });
  }
}
