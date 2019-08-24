import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { CacheService } from '../servies/cache.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-file-aupploadings',
  templateUrl: './file-aupploadings.component.html',
  styleUrls: ['./file-aupploadings.component.css']
})
export class FileAupploadingsComponent implements OnInit {
  totalFileAttached: number ;
  SpNo: string ;
  stepper: number;



  @ViewChild('prizes') prizesF: FileUpload;
  @ViewChild('commendation') commendationF: FileUpload;
  @ViewChild('nationalRecommendation') nationalRecommendationF: FileUpload;
  @ViewChild('internationalRecommendations') internationalRecommendationsF: FileUpload;
  @ViewChild('academicAndProfessionalQaulification') academicAndProfessionalQaulificationF: FileUpload;
  @ViewChild('specialAssignements') specialAssignemtnsF: FileUpload;
  @ViewChild('publications') publicationsF: FileUpload;
  @ViewChild('extraCurriculaActivities') extraCurriculaActivitiesF: FileUpload;
  @ViewChild('educationalCertificates') educationalCertificatesF: FileUpload;
  @ViewChild('honours') honoursF: FileUpload;
  @ViewChild('awards') awardsF: FileUpload;

  constructor(private messageService: MessageService ,
    private cacheService: CacheService ,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) {
     }


  ngOnInit() {
    this.SpNo = this.activatedRoute.snapshot.params['SpNo'];
    this.loadHandlers();
    if (this.SpNo === null) {
      this.router.navigate(['/home']);
    }
  }

  /**
   * 
   * @param event
   */
  onBasicUpload(event) {
    console.log('File was uploaded successfully!', event.files.length);
    this.addSuccessMessage('Attachments was successful');
    this.totalFileAttached += event.files.length ;
  }


  /**
   *
   * @param event
   */
  onBasicError(event) {
    console.log(event);
      this.addErrorMessage('File(s) failed to attach');
  }



  /**
   * 
   */
  addErrorMessage(details) {
    this.messageService.add({severity: 'error', summary: 'Your File WAS NOT uploaded successfully', detail: details});
  }

  /**
   * 
   * @param details
   */
  addSuccessMessage(details) {
    this.messageService.add({severity: 'success', summary: 'Your Fileuploaded successfully', detail: details});
  }

  loadHandlers() {
    this.prizesF.url  = this.cacheService.serverURL + '/upload/prizes/' +
      this.SpNo;
      this.commendationF.url  = this.cacheService.serverURL + '/upload/commendations/' +
      this.SpNo;
      this.nationalRecommendationF.url  = this.cacheService.serverURL + '/upload/national-recognitions/' +
      this.SpNo;
      this.internationalRecommendationsF.url  = this.cacheService.serverURL + '/upload/international-recognitions/' +
      this.SpNo;
      this.academicAndProfessionalQaulificationF.url  = this.cacheService.serverURL + '/upload/national-and-professional-qaulifications/' +
      this.SpNo;
      this.specialAssignemtnsF.url  = this.cacheService.serverURL + '/upload/special-assignments/' +
      this.SpNo;
      this.publicationsF.url  = this.cacheService.serverURL + '/upload/publications/' +
      this.SpNo;
      this.extraCurriculaActivitiesF.url  = this.cacheService.serverURL + '/upload/extra-curricula-activities/' +
      this.SpNo;
      this.educationalCertificatesF.url  = this.cacheService.serverURL + '/upload/educational-certificates/' +
      this.SpNo;
      this.honoursF.url  = this.cacheService.serverURL + '/upload/honours/' +
      this.SpNo;
      this.awardsF.url  = this.cacheService.serverURL + '/upload/awards/' +
      this.SpNo;
  }

  /**
   * 
   * @param index
   */
  public setStepper(index: number) {
    this.stepper = index;
  }

 public nextStepper() {
    this.stepper++;
  }

  public prevStepper() {
    this.stepper--;
  }

  done() {
    window.open('http://localhost:4300', 'self'); // take the user to the dashboard login
  }
}
