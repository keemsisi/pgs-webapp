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
  username: string ;
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
    this.username = this.activatedRoute.snapshot.params['username'];
    this.loadHandlers();
    if (this.username === null) {
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
      this.username;
      this.commendationF.url  = this.cacheService.serverURL + '/upload/commendations/' +
      this.username;
      this.nationalRecommendationF.url  = this.cacheService.serverURL + '/upload/national-recognitions/' +
      this.username;
      this.internationalRecommendationsF.url  = this.cacheService.serverURL + '/upload/international-recognitions/' +
      this.username;
      this.academicAndProfessionalQaulificationF.url  = this.cacheService.serverURL + '/upload/national-and-professional-qaulifications/' +
      this.username;
      this.specialAssignemtnsF.url  = this.cacheService.serverURL + '/upload/special-assignments/' +
      this.username;
      this.publicationsF.url  = this.cacheService.serverURL + '/upload/publications/' +
      this.username;
      this.extraCurriculaActivitiesF.url  = this.cacheService.serverURL + '/upload/extra-curricula-activities/' +
      this.username;
      this.educationalCertificatesF.url  = this.cacheService.serverURL + '/upload/educational-certificates/' +
      this.username;
      this.honoursF.url  = this.cacheService.serverURL + '/upload/honours/' +
      this.username;
      this.awardsF.url  = this.cacheService.serverURL + '/upload/awards/' +
      this.username;
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
