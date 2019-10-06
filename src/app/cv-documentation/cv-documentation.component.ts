import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Output, Input } from '@angular/core';
import {
  FormGroup, FormBuilder, FormControl, Validators, FormArray, ValidatorFn,
  AbstractControl, AsyncValidatorFn, ValidationErrors
} from '@angular/forms';
import { SignaturePad, PointGroup, Point } from 'angular2-signaturepad/signature-pad';
import { CustomHttpServicesService } from '../services/custom-http-services.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Event, Router } from '@angular/router';
import { FileUpload } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { CacheService } from '../services/cache.service';
import { timeout } from 'q';
import { forkJoin } from 'rxjs';
import { EventEmitter } from 'events';



@Component({
  selector: 'app-cv-documentation',
  templateUrl: './cv-documentation.component.html',
  styleUrls: ['./cv-documentation.component.css']
})
export class CvDocumentationComponent implements OnInit, AfterViewInit {
  // serverURL: 'http://localhost:8081';
  serverURL: 'https://promotbotformserver.herokuapp.com';

  @Output() yesdash : EventEmitter = new EventEmitter();
  // @Input()  

  belongsTo: Array<string> = [
    'Religious Body',
    'Individual',
    'CBOs',
    'NGOs',
    'Corporate Organization',
    'Other Nationality School',
  ];

  location: Array<string> = ['Rural', 'Urban', 'Others'];
  personalInformation: FormGroup;
  eaphni: FormGroup;
  workExperience: FormArray;
  otherWorkExperience: FormArray;
  schoolworkexp: FormArray;
  courseDescriptions: FormArray;
  paperReviewing: FormArray;
  articlesAcc: FormArray;
  artInP: FormArray;
  @Input() show: Boolean = true ;

  refrees: FormArray;
  publications: FormGroup;
  thesisDissPro: FormArray;
  // articlesInLeanedJournals: FormArray;
  books: FormArray;
  extraCurricularActivies: FormArray;
  membershipOfProfessionalBodies: FormArray;
  commendation: FormArray;
  dateAndSignature: FormGroup;
  pointSigned: Point[][];
  specialAssignmentATE: FormArray;
  specialAssignmentMC: FormArray;
  specialAssignmentCS: FormArray;
  trainingProgramme: FormArray;
  fellowship: FormArray;
  supervisionPost: FormArray;
  extraCurriculaActivities: FormArray;
  researchInterests: FormArray;
  researchInProgress: FormArray;
  finalStage: FormGroup;
  showBlurBackgroundOverlay: Boolean = false;
  loginCredentials: FormGroup;
  totalFileAttached = 0;
  supervisionPostPart: FormArray;
  conferencesAttended: FormArray;
  papersRead: FormArray;
  commissionedProject: FormArray;

  payGram: PayLoadInterface = {
    masterFormGroupings: {},
    personalInformation: {},
    eaphni: {},
    loginCred: {}
  }; // the data to send to the server
  masterFormGroupings: FormGroup;
  step = 0;
  stepper = 0;

  prizesFiles: Array<File> = [];
  honoursFiles: Array<File> = [];
  nationalRecommendationsFiles: Array<File> = [];
  internationalRecommendationsFiles: Array<File> = [];
  commendationFiles: Array<File> = [];
  publicationsFiles: Array<File> = [];
  specialAssignmentATEFiles: Array<File> = [];
  specialAssignmentMCFiles: Array<File> = [];
  specialAssignmentCSFiles: Array<File> = [];
  extraCurriculaActivitiesFiles: Array<File> = [];
  educationalCertificates: Array<[]> = [];
  academicAndProfessionFiles: Array<File> = [];
  nationalRecommendationFiles: Array<File> = [];
  myfile = [];
  SpNoCond: boolean;
  passwordMismatched: boolean;
  signatureFound = false;





  /**
   * Array of answers from the survey question
   */
  surveyAnswers: { [question: string]: string };

  @ViewChild(SignaturePad , {static : true}) signaturePad: SignaturePad;
  @ViewChild('prizes', {static : true}) prizesF: FileUpload;
  @ViewChild('commendation', {static : true}) commendationF: FileUpload;
  @ViewChild('nationalRecommendation', {static : true}) nationalRecommendationF: FileUpload;
  @ViewChild('internationalRecommendations', {static : true}) internationalRecommendationsF: FileUpload;
  @ViewChild('academicQualifications', {static : true}) academicQualificationsF: FileUpload;
  @ViewChild('specialAssignements', {static : true}) specialAssignemtnsF: FileUpload;
  @ViewChild('publications', {static : true}) publicationsF: FileUpload;
  @ViewChild('extraCurriculaActivities', {static : true}) extraCurriculaActivitiesF: FileUpload;
  @ViewChild('educationalCertificates', {static : true}) educationalCertificatesF: FileUpload;
  @ViewChild('honours', {static : true}) honoursF: FileUpload;
  @ViewChild('awards', {static : true}) awardsF: FileUpload;





  public signaturePadOptions: Object = {
    'minWidth': 0.3,
    'canvasWidth': 800,
    'canvasHeight': 500
  };

  constructor(private fb: FormBuilder, private httpRequest: CustomHttpServicesService,
    private messageService: MessageService, private cacheService: CacheService, private router: Router) {
  }

  ngOnInit() {
    this.FORM_INIT();
    // this.asynchronousValidators();
    if (JSON.parse(window.localStorage.getItem('personalInformation')) !== null
      && JSON.parse(window.localStorage.getItem('loginCredentials')) !== null
      && JSON.parse(window.localStorage.getItem('eaphni')) !== null
      && JSON.parse(window.localStorage.getItem('masterFormGroupings')) !== null
    ) {
      this.populateFormValues();
      if (<FormGroup>(this.masterFormGroupings.controls['dateAndSignature']).get('signature').value !== null) {
        this.signatureFound = true;
      }
    }
  }

  /**
   * Method implementation of the AfterViewInit for the signature pad
   */
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 3); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    if (this.signatureFound) {
      this.signaturePad.fromData((<FormGroup>this.masterFormGroupings.controls['dateAndSignature']).controls['signature'].value);
      // console.log(' ' + (<FormGroup>this.masterFormGroupings.controls['dateAndSignature']).controls['signature'].value);
    }
  }

  clearSignature() {
    this.signaturePad.clear();
  }


  /**
   * The method called by the signature pad on draw complete
   */
  drawComplete() {
    this.dateAndSignature.controls['signature'].setValue(this.signaturePad.toData());
    this.dateAndSignature.controls['base64Image'].setValue(this.signaturePad.toDataURL('base64'));
  }

  drawStart() {
    // console.log('begin drawing');
  }


  public setStep(index: number) {
    this.step = index;
  }

  public nextStep() {
    this.step++;
  }

  public prevStep() {
    this.step--;
  }







  onBasicUpload(event) {
    // var g = new FileReader() ;
    // g.readAsArrayBuffer(this.prizesF.files[0]);
    // console.log('File was uploaded successfully!', event.files.length);
    this.addSuccessMessage('Attachments was successful');
    this.totalFileAttached += 1;
  }


  /**
   *
   * @param $event
   */
  // onRemovePrizesFiles($event) {
  //   this.httpRequest.removeFiles({
  //     'url': 'prizes', 'data':
  //       this.personalInformation.controls['prizesFilesmetaData'].value
  //   }).subscribe(data => {
  //     // console.log('Response Message', data);
  //     this.personalInformation.controls['prizesFilesmetaData'].setValue(data);
  //   }, (error: HttpErrorResponse) => {
  //     if (error.status === 500) {
  //       // console.log('Server error occured please contact admin');
  //     } else {
  //       // console.log(error);
  //     }
  //   });
  // }


  /**
   * 
   * @param $event 
   */
  onSelectNationalRecommendationsFiles($event) {
    for (const file of $event.target.files) {
      this.nationalRecommendationsFiles.push(file);
    }
  }


  /**
  * 
  * @param $event 
  */
  onRemoveNationalRecommendationsFiles($event) {
    for (const file of $event.target.file) {
      this.nationalRecommendationsFiles.push(file);
    }
  }

  /**
  * 
  * @param $event 
  */
  onSelectInternationalRecommendationsFiles($event) {
    for (const file of $event.target.files) {
      this.internationalRecommendationsFiles.push(file);
    }
  }


  /**
   *
   * @param $event
   */
  onRemoveInternationalRecommendationsFiles($event) {
    for (const file of $event.target.files) {
      this.internationalRecommendationsFiles.push(file);
    }
  }

  /**
  * 
  * @param $event 
  */
  onSelectCommendationFiles($event) {
    for (const file of $event.target.files) {
      this.commendationFiles.push(file);
    }
  }


  /**
   * 
   * @param $event
   */
  onRemoveCommendationFiles($event) {
    for (const file of $event.target.files) {
      this.commendationFiles.push(file);
    }
  }


  /**
  * @param $event
  */
  onSelectPublicationsFiles($event) {
    for (const file of $event.target.files) {
      this.publicationsFiles.push(file);
    }
  }


  /**
   * @param $event
   */
  onRemovePublicationsFiles($event) {
    for (const file of $event.target.files) {
      this.publicationsFiles.push(file);
    }
  }


  /**
   * @param $event 
   */
  onSelectSpecialAssignmentATEFiles($event) {
    for (const file of $event.target.files) {
      this.specialAssignmentATEFiles.push(file);
    }
  }


  /**
  * @param $event 
  */
  onRemoveSpecialAssignmentATEFiles($event) {

    for (const file of $event.target.files) {
      this.specialAssignmentATEFiles.push(file);
    }
  }


  /**
 * @param $event 
 */
  onSelectSpecialAssignmentMCFiles($event) {
    for (const file of $event.target.files) {
      this.specialAssignmentMCFiles.push(file);
    }
  }


  /**
  * @param $event 
  */
  onRemoveSpecialAssignmentMCFiles($event) {

    for (const file of $event.target.files) {
      this.specialAssignmentMCFiles.push(file);
    }
  }

  /**
* @param $event 
*/
  onSelectSpecialAssignmentCSFiles($event) {
    for (const file of $event.target.files) {
      this.specialAssignmentMCFiles.push(file);
    }
  }


  /**
  * @param $event 
  */
  onRemoveSpecialAssignmentCSFiles($event) {

    for (const file of $event.target.files) {
      this.specialAssignmentMCFiles.push(file);
    }
  }

  /**
   *
   * @param $even
   */
  onSelectExtraCurriculaActivitiesFiles($event) {
    for (const file of $event.target.files) {
      this.extraCurriculaActivitiesFiles.push(file);
    }
  }


  /**
  *
  * @param $even
  */
  onRemoveExtraCurriculaActivitiesFiles($event) {
    for (const file of $event.target.files) {
      this.extraCurriculaActivitiesFiles.push(file);
    }
  }


  /**
   *
   * @param $even
   */
  onSelectEducationalCertificates($event) {
    for (const file of $event.target.files) {
      this.educationalCertificates.push(file);
    }
  }

  /**
   *
   * @param $even
   */
  onRemoveEducationalCertificates($event) {
    for (const file of $event.target.files) {
      this.educationalCertificates.push(file);
    }
  }



  /**
 *
 * @param $even
 */
  onSelectAcademicAndProfession($event) {
    for (const file of $event.target.files) {
      this.academicAndProfessionFiles.push(file);
    }
  }



  /**
   *
   * @param $even
   */
  onRemoveAcademicAndProfession($event) {
    for (const file of $event.target.files) {
      this.academicAndProfessionFiles.push(file);
    }
  }


  /**
   * 
   * @param $even
   */
  onSelectNationalRecommendationFiles($event) {
    for (const file of $event.target.files) {
      this.nationalRecommendationsFiles.push(file);
    }
  }


  /**
     * 
     * @param $even
  */
  onRemoveNationalRecommendationFiles($event) {
    for (const file of $event.target.files) {
      this.nationalRecommendationsFiles.push(file);
    }
  }



  /**
   *
   * @param event
   */
  onBasicError(event) {
    // console.log(event);
    // if( event.error.TypeError  === "Cannot read property 'toLowerCase' of undefined" ) {
    // this.addErrorMessage('Cant not upload file (SpNo field is empty)');
    // } else {
    this.addErrorMessage('File(s) failed to attach');
    // }
  }




  initeaphni(): FormGroup {
    return this.fb.group({
      schoolAttended: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      fromDate: new FormControl('', [Validators.required, Validators.pattern(new RegExp('\\d{4,}'))]),
      toDate: new FormControl('', [Validators.required, Validators.pattern(new RegExp('\\d{4,}'))]),
    });
  }


  addEducational(): void {
    // push new educational background here 
    (<FormArray>this.eaphni.controls['educationArray']).push(this.initeaphni());
  }

  /**
   * 
   * @param indexAt The Index of the educational background to remove 
   */
  removeEducational(indexAt: number): boolean {
    (<FormArray>this.eaphni.controls['educationArray']).removeAt(indexAt);
    return true;
  }



  initAcademicQualification() {
    return this.fb.group({
      title: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      date: new FormControl('', [Validators.required]),
    });
  }

  addAcademicQualification(): void {
    (<FormArray>this.eaphni.controls['academicQualifications']).push(this.initAcademicQualification());
  }

  /**
   *
   * @param indexAt The Index of the educational background to remove 
   */
  removeAcademicQualification(indexAt: number): boolean {
    (<FormArray>this.eaphni.controls['academicQualifications']).removeAt(indexAt);
    return true;
  }



  addPrizes(): void {
    (<FormArray>this.eaphni.controls['prizes']).push(this.initPHNI());
  }

  /**
   * 
   * @param indexAt The Index of the educational background to remove 
   */
  removePrizes(indexAt: number): boolean {
    (<FormArray>this.eaphni.controls['prizes']).removeAt(indexAt);
    return true;
  }

  addHonours(): void {
    (<FormArray>this.eaphni.controls['honours']).push(this.initPHNI());

  }

  /**
   * 
   * @param indexAt The Index of the educational background to remove 
   */
  removeHonours(indexAt: number): boolean {
    (<FormArray>this.eaphni.controls['honours']).removeAt(indexAt);
    return true;
  }



  initScholarship(): FormGroup {
    return this.fb.group({
      receivedFrom: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      title: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      date: new FormControl('', [Validators.required, Validators.pattern(new RegExp('\\d{4,}'))]),
    });
  }


  addScholarship(): void {
    (<FormArray>this.eaphni.controls['scholarships']).push(this.initScholarship());
  }

  /**
   * 
   * @param indexAt The Index of the educational background to remove
   */
  removeScholarship(indexAt: number): boolean {
    (<FormArray>this.eaphni.controls['scholarships']).removeAt(indexAt);
    return true;
  }



  addNationalRecommendations(): void {
    (<FormArray>this.eaphni.controls['nationalRecommendations']).push(this.initPHNI());
  }

  /**
   * 
   * @param indexAt The Index of the educational background to remove 
   */
  removeNationalRecommendations(indexAt: number): boolean {
    (<FormArray>this.eaphni.controls['nationalRecommendations']).removeAt(indexAt);
    return true;
  }


  addInternationalRecommendations(): void {
    (<FormArray>this.eaphni.controls['internationalRecommendations']).push(this.initPHNI());
  }

  /**
   * 
   * @param indexAt The Index of the educational background to remove
   */
  removeInternationalRecommendations(indexAt: number): boolean {
    (<FormArray>this.eaphni.controls['internationalRecommendations']).removeAt(indexAt);
    return true;
  }



  initWorkExp(): FormGroup {
    return this.fb.group({
      organization: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      postHeld: new FormControl('', [Validators.required]),
      duties: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required, Validators.pattern(new RegExp('\\d{4,}'))]),
      toDate: new FormControl('', [Validators.required, Validators.pattern(new RegExp('\\d{4,}'))]),
    });
  }


  addWorkExp(): void {
    // push new educational background here
    (<FormArray>this.workExperience).push(this.initWorkExp());
  }

  /**
   *
   * @param indexAt 
   */
  removeWorkExp(indexAt: number): boolean {
    (<FormArray>this.workExperience).removeAt(indexAt);
    return true;
  }




  initOtherWorkExp(): FormGroup {
    return this.fb.group({
      organization: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      postHeld: new FormControl('', [Validators.required]),
      duties: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required, Validators.pattern(new RegExp('\\d{4,}'))]),
      toDate: new FormControl('', [Validators.required, Validators.pattern(new RegExp('\\d{4,}'))]),
    });
  }


  addOtherWorkExp(): void {
    // push new educational background here
    (<FormArray>this.otherWorkExperience).push(this.initOtherWorkExp());
  }

  /**
   *
   * @param indexAt
   */
  removeOtherWorkExp(indexAt: number): boolean {
    (<FormArray>this.otherWorkExperience).removeAt(indexAt);
    return true;
  }


  initCourseDescription(): FormGroup {
    return this.fb.group({
      courseCode: new FormControl('', [Validators.required]),
      courseTitle: new FormControl('', [Validators.required]),
    });
  }


  addCourseDescription(): void {
    (<FormArray>this.courseDescriptions).push(this.initCourseDescription());
  }

  /**
   *
   * @param indexAt
   */
  removeCourseDescription(indexAt: number): boolean {
    (<FormArray>this.courseDescriptions).removeAt(indexAt);
    return true;
  }




  initSchoolWorkExp(): FormGroup {
    return this.fb.group({
      courseCode: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{3}\\d{3}')]),
      creditHours: new FormControl('', [Validators.required, Validators.pattern('\\d*')]),
      numOfLecturers: new FormControl('', [Validators.required, Validators.pattern('\\d*')]),
      numberOfRegStd: new FormControl('', [Validators.required, Validators.pattern('\\d*')]),
      contribution: new FormControl('', [Validators.required]),
      session: new FormControl('', [Validators.required, Validators.pattern('\\d{4}\\/\\d{4}')]),
      school: new FormControl('', [Validators.required]),
      level: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]*')])
    });
  }


  addCausesTaught(): void {
    // push new educational background here
    (<FormArray>this.schoolworkexp).push(this.initSchoolWorkExp());
  }

  /**
   * 
   * @param indexAt The Index of the educational background to remove 
   */
  removeCausesTaught(indexAt: number): boolean {
    (<FormArray>this.schoolworkexp).removeAt(indexAt);
    return true;
  }



  initThesisDissPro(): FormGroup {
    return this.fb.group({
      // title : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      // publicationYear : new FormControl('', [Validators.required]),
      // publisher: new FormControl('', [Validators.required]),
      thesis: new FormControl('', [Validators.required]),
    });
  }





  addThesisDissPro(): void {
    (<FormArray>this.publications.controls['thesisDissPro']).push(this.initThesisDissPro());
  }

  /**
   *
   * @param indexAt The Index of the  Publication to remove
   */
  removeThesisDissPro(indexAt: number): boolean {
    (<FormArray>this.publications.controls['thesisDissPro']).removeAt(indexAt);
    return true;
  }



  initArtInP(): FormGroup {
    return this.fb.group({
      pubName: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required]),
      sn: new FormControl('', [Validators.required]),
      availableAt: new FormControl('', [Validators.required]),
      lf: new FormControl('', [Validators.required]),
      journalA: new FormControl('', [Validators.required]),
      used: new FormControl('', [Validators.required]),
    });
  }

  addArtInP(): void {
    (<FormArray>this.publications.controls['artInP']).push(this.initArtInP());
  }

  /**
   *
   * @param indexAt The Index of the  Publication to remove
   */
  removeArtInP(indexAt: number): boolean {
    (<FormArray>this.publications.controls['artInP']).removeAt(indexAt);
    return true;
  }

  initArticleAcc(): FormGroup {
    return this.fb.group({
      pubName: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required]),
      sn: new FormControl('', [Validators.required]),
      availableAt: new FormControl('', [Validators.required]),
      used: new FormControl('', [Validators.required]),
      lf: new FormControl('', [Validators.required]),
      journalAc: new FormControl('', [Validators.required]),
    });
  }

  addArticleAcc(): void {
    (<FormArray>this.publications.controls['articlesAcc']).push(this.initArticleAcc());
  }

  /**
   *
   * @param indexAt The Index of the  Publication to remove
   */
  removeArticleAcc(indexAt: number): boolean {
    (<FormArray>this.publications.controls['articlesAcc']).removeAt(indexAt);
    return true;
  }




  initArticlesInLearnedJournals(): FormGroup {
    return this.fb.group({
      // title : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      // publicationYear : new FormControl('', [Validators.required]),
      // publisher: new FormControl('', [Validators.required]),
      article: new FormControl('', [Validators.required]),
    });
  }


  addArticlesInLeanedJournals(): void {
    (<FormArray>this.publications.controls['articlesInLeanedJournals']).push(this.initArticlesInLearnedJournals());
  }

  /**
   *
   * @param indexAt The Index of the  Publication to remove
   */
  removeArticlesInLeanedJournals(indexAt: number): boolean {
    (<FormArray>this.publications.controls['articlesInLeanedJournals']).removeAt(indexAt);
    return true;
  }



  initBook(): FormGroup {
    return this.fb.group({
      book: new FormControl('', []),
      used: new FormControl('', []),
    });
  }


  addBook(): void {
    (<FormArray>this.publications.controls['books']).push(this.initBook());
  }

  /**
   *
   * @param indexAt The Index of the  Publication to remove
   */
  removeBook(indexAt: number): boolean {
    (<FormArray>this.publications.controls['books']).removeAt(indexAt);
    return true;
  }

  initPaperReviewing(): FormGroup {
    return this.fb.group({
      paperR: new FormControl('', []),
    });
  }


  addPaperReviewing(): void {
    (<FormArray>this.paperReviewing).push(this.initPaperReviewing());
  }

  /**
   *
   * @param indexAt The Index of the  Publication to remove
   */
  removePaperReviewing(indexAt: number): boolean {
    (<FormArray>this.paperReviewing).removeAt(indexAt);
    return true;
  }

  initBookArticlesOrChapter(): FormGroup {
    return this.fb.group({
      bookArtChapt: new FormControl('', [Validators.required]),
      used: new FormControl('', [Validators.required])
    });
  }


  addBookArticlesOrChapter(): void {
    (<FormArray>this.publications.controls['bookArticlesOrChapter']).push(this.initBookArticlesOrChapter());
  }

  /**
   *
   * @param indexAt The Index of the  Publication to remove
   */
  removeBookArticlesOrChapter(indexAt: number): boolean {
    (<FormArray>this.publications.controls['bookArticlesOrChapter']).removeAt(indexAt);
    return true;
  }



  initEditedCP(): FormGroup {
    return this.fb.group({
      pubName: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      publisher: new FormControl('', [Validators.required]),
      sn: new FormControl('', [Validators.required]),
      availableAt: new FormControl('', [Validators.required]),
      used: new FormControl('', [Validators.required]),
      lf: new FormControl('', [Validators.required]),
      editCP: new FormControl('', [Validators.required]),
    });
  }


  addEditedCP(): void {
    (<FormArray>this.publications.controls['editedConf']).push(this.initEditedCP());
  }

  /**
   *
   * @param indexAt The Index of the  Publication to remove
   */
  removeEditedCP(indexAt: number): boolean {
    (<FormArray>this.publications.controls['editedConf']).removeAt(indexAt);
    return true;
  }




  initPaper(): FormGroup {
    return this.fb.group({
      paper: new FormControl('', [Validators.required]),
      used: new FormControl('', [Validators.required])
    });
  }


  addPaper(): void {
    (<FormArray>this.publications.controls['papers']).push(this.initPaper());
  }

  /**
   *
   * @param indexAt The Index of the  Publication to remove
   */
  removePaper(indexAt: number): boolean {
    (<FormArray>this.publications.controls['papers']).removeAt(indexAt);
    return true;
  }













  initCommd(): FormGroup {
    return this.fb.group({
      by: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      commendationFor: new FormControl(''),
      commendationDate: new FormControl(''),
    });
  }


  addCommd(): void {
    (<FormArray>this.commendation).push(this.initCommd());
  }

  /**
   *
   * @param indexAt The Index of the Commendation to remove 
   */
  removeCommd(indexAt: number): boolean {
    (<FormArray>this.commendation).removeAt(indexAt);
    return true;
  }



  initRefree(): FormGroup {
    return this.fb.group({
      refreeFullName: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      occupation: new FormControl(''),
      phoneNumber: new FormControl('', [Validators.min(13), Validators.max(13), Validators.pattern(new RegExp('\\d{13,13}'))]),
      address: new FormControl(''),
      email: new FormControl(''),
    });
  }



  addRefree(): void {
    // push new educational background here
    (<FormArray>this.refrees).push(this.initRefree());
  }

  /**
   *
   * @param indexAt The Index of the Commendation to remove 
   */
  removeRefree(indexAt: number): boolean {
    (<FormArray>this.refrees).removeAt(indexAt);
    return true;
  }



  public initMembershipOfProfessionalBodies(): FormGroup {
    return this.fb.group({
      postHeld: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      organization: new FormControl(''),
      no: new FormControl(''),
    });
  }


  public addMembershipOfProfessionalBodies(): void {
    // push new here
    (<FormArray>this.membershipOfProfessionalBodies).push(this.initMembershipOfProfessionalBodies());
  }

  /**
   *
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeMembershipOfProfessionalBodiesIndex(indexAt: number): boolean {
    (<FormArray>this.membershipOfProfessionalBodies).removeAt(indexAt);
    return true;
  }


  public initSpecialAssignemtATE(): FormGroup {
    return this.fb.group({
      postHeld: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      organization: new FormControl(''),
      fromDate: new FormControl('', [Validators.pattern(new RegExp('\\d{4,}'))]),
      toDate: new FormControl('', [Validators.pattern(new RegExp('\\d{4,}'))])
    });
  }


  public addSpecialAssignmentATE(): void {
    // push new here
    (<FormArray>this.specialAssignmentATE).push(this.initSpecialAssignemtATE());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeSpecialAssignmentATE(indexAt: number): boolean {
    (<FormArray>this.specialAssignmentATE).removeAt(indexAt);
    return true;
  }



  public initSpecialAssignemtMC(): FormGroup {
    return this.fb.group({
      postHeld: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      organization: new FormControl(''),
      fromDate: new FormControl('', [Validators.pattern(new RegExp('\\d{4,}'))]),
      toDate: new FormControl('', [Validators.pattern(new RegExp('\\d{4,}'))])
    });
  }


  public addSpecialAssignmentMC(): void {
    // push new here
    (<FormArray>this.specialAssignmentMC).push(this.initSpecialAssignemtMC());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeSpecialAssignmentMC(indexAt: number): boolean {
    (<FormArray>this.specialAssignmentMC).removeAt(indexAt);
    return true;
  }


  public initSpecialAssignemtCS(): FormGroup {
    return this.fb.group({
      postHeld: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      communityServiceDescription: new FormControl(''),
      fromDate: new FormControl('', [Validators.pattern(new RegExp('\\d{4,}'))]),
      toDate: new FormControl('', [Validators.pattern(new RegExp('\\d{4,}'))])
    });
  }


  public addSpecialAssignmentCS(): void {
    // push new here
    (<FormArray>this.specialAssignmentCS).push(this.initSpecialAssignemtCS());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeSpecialAssignmentCS(indexAt: number): boolean {
    (<FormArray>this.specialAssignmentCS).removeAt(indexAt);
    return true;
  }



  public initResearchInterests(): FormGroup {
    return this.fb.group({
      interest: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      // outline: new FormControl('')
    });
  }



  public addResearchInterests(): void {
    // push new here
    (<FormArray>this.researchInterests).push(this.initResearchInterests());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeResearchInterests(indexAt: number): boolean {
    (<FormArray>this.researchInterests).removeAt(indexAt);
    return true;
  }





  public initCommissionedProject(): FormGroup {
    return this.fb.group({
      commissionedProject: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    });
  }


  public addCommissionedProject(): void {
    // push new here
    (<FormArray>this.commissionedProject).push(this.initCommissionedProject());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeCommissionedProject(indexAt: number): boolean {
    (<FormArray>this.commissionedProject).removeAt(indexAt);
    return true;
  }


  public initResearchInProgress(): FormGroup {
    return this.fb.group({
      researchInProgress: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    });
  }


  public addResearchInProgress(): void {
    // push new here
    (<FormArray>this.publications.controls['researchInProgress']).push(this.initResearchInProgress());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeResearchInProgress(indexAt: number): boolean {
    (<FormArray>this.publications.controls['researchInProgress']).removeAt(indexAt);
    return true;
  }


  public initFellowship(): FormGroup {
    return this.fb.group({
      post: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      fellowship: new FormControl(''),
      date: new FormControl('', [Validators.pattern(new RegExp('\\d{4,}'))])
    });
  }

  public addFellowship(): void {
    // push new here
    (<FormArray>this.fellowship).push(this.initFellowship());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeFellowship(indexAt: number): boolean {
    (<FormArray>this.fellowship).removeAt(indexAt);
    return true;
  }



  public initSupervisionPost(): FormGroup {
    return this.fb.group({
      title: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      nameOfStudent: new FormControl(''),
      _d1: new FormControl(''),
      _d2: new FormControl(''),
      soleColla: new FormControl(''),
      degree: new FormControl(''),
    });
  }


  public addSupervisionPost(): void {
    // push new here
    (<FormArray>this.supervisionPost).push(this.initSupervisionPost());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeSupervisionPost(indexAt: number): boolean {
    (<FormArray>this.supervisionPost).removeAt(indexAt);
    return true;
  }

  public initTechnicalReport(): FormGroup {
    return this.fb.group({
      report: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    });
  }


  public addTechnicalReport(): void {
    // push new here
    (<FormArray>this.publications.controls.technicalReport).push(this.initTechnicalReport());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeTechnicalReport(indexAt: number): boolean {
    (<FormArray>this.publications.controls.technicalReport).removeAt(indexAt);
    return true;
  }




  public initSupervisionPostPart(): FormGroup {
    return this.fb.group({
      title: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      nameOfStudent: new FormControl(''),
      _d1: new FormControl(''),
      _d2: new FormControl(''),
      soleColla: new FormControl(''),
      degree: new FormControl(''),
    });
  }

  public addSupervisionPostPart(): void {
    // push new here
    (<FormArray>this.supervisionPostPart).push(this.initSupervisionPost());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeSupervisionPostPart(indexAt: number): boolean {
    (<FormArray>this.supervisionPostPart).removeAt(indexAt);
    return true;
  }





  public initTrainingProgramme(): FormGroup {
    return this.fb.group({
      training: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      description: new FormControl('')
    });
  }


  public addTrainingProgramme(): void {
    // push new here
    (<FormArray>this.trainingProgramme).push(this.initTrainingProgramme());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeTrainingProgramme(indexAt: number): boolean {
    (<FormArray>this.trainingProgramme).removeAt(indexAt);
    return true;
  }

  public initConferenceAttended(): FormGroup {
    return this.fb.group({
      confPapR: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    });
  }
  public addConferenceAttended(): void {
    // push new here
    (<FormArray>this.conferencesAttended).push(this.initConferenceAttended());
  }
  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeConferenceAttended(indexAt: number): boolean {
    (<FormArray>this.conferencesAttended).removeAt(indexAt);
    return true;
  }

  public initPapersRead(): FormGroup {
    return this.fb.group({
      paper: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    });
  }

  public addPapersRead(): void {
    // push new here
    (<FormArray>this.papersRead).push(this.initPaper());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removePapersRead(indexAt: number): boolean {
    (<FormArray>this.papersRead).removeAt(indexAt);
    return true;
  }


  public initEmailAdress(): FormGroup {
    return this.fb.group({
      emailAddress: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    });
  }

  public addEmailAdress(): void {
    // push new here
    (<FormArray>this.personalInformation.get('emailAddresses')).push(this.initEmailAdress());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeEmailAdress(indexAt: number): boolean {
    (<FormArray>this.personalInformation.get('emailAddresses')).removeAt(indexAt);
    return true;
  }



  public initPhoneNumber(): FormGroup {
    return this.fb.group({
      phoneNumber: new FormControl('', [Validators.pattern(new RegExp('\\+\\d{13}|\\d{11}'))]),
    });
  }


  public addPhoneNumber(): void {
    // push new here
    (<FormArray>this.personalInformation.get('phoneNumbers')).push(this.initPhoneNumber());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removePhoneNumber(indexAt: number): boolean {
    (<FormArray>this.personalInformation.get('phoneNumbers')).removeAt(indexAt);
    return true;
  }

  public initContactAddress(): FormGroup {
    return this.fb.group({
      contactAddress: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    });
  }


  public addContactAddress(): void {
    // push new here
    (<FormArray>this.personalInformation.get('contactAddresses')).push(this.initContactAddress());
  }

  /**
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeContactAddress(indexAt: number): boolean {
    (<FormArray>this.personalInformation.get('contactAddresses')).removeAt(indexAt);
    return true;
  }




  public initExtraCurriculaActivities(): FormGroup {
    return this.fb.group({
      activity: new FormControl('')
    });
  }

  public initPHNI(): FormGroup {
    return this.fb.group({
      receivedFrom: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      title: new FormControl(''),
      date: new FormControl('', [Validators.pattern(new RegExp('\\d{4,}'))]),
    });
  }

  public addPHNI(): void {
    (<FormArray>this.extraCurriculaActivities).push(this.initPHNI());
  }

  public addExtraCurriculaActivities(): void {
    (<FormArray>this.extraCurriculaActivities).push(this.initExtraCurriculaActivities());
  }


  public initProfessionalQualification(): FormGroup {
    return this.fb.group({
      receivedFrom: new FormControl('', [Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      date: new FormControl('', [Validators.pattern(new RegExp('\\d{4,}'))]),
    });
  }

  public addProfessionalQualification(): void {
    (<FormArray>this.eaphni.controls['professionalQualifications']).push(this.initProfessionalQualification());
  }

  public removeProfessionalQualification(indexAt: number): void {
    (<FormArray>this.eaphni.controls['professionalQualifications']).removeAt(indexAt);
  }

  /**
   *
   * @param indexAt The Index of MembershipOfProfessionalBodies to remove
   */
  public removeExtraCurriculaActivities(indexAt: number): boolean {
    (<FormArray>this.extraCurriculaActivities).removeAt(indexAt);
    return true;
  }
  public processApplication() {

    // // master groupings , personal information educational bacgrounds
    // Object.keys(this.eaphni.controls).forEach( key => {
    //   this.payGram.personalInformation[key] = this.personalInformation.controls[key].value;
    // });


    // Object.keys(this.eaphni.controls).forEach( key => {
    //   if (this.eaphni.controls[key].value instanceof Array) {
    //     const arrayToAdd = {} ;
    //     (Array)(this.eaphni.controls[key].value).forEach(k=> {
    //       arrayToAdd[k] = this.eaphni.controls[key].value ;
    //     })
    //   }
    //   this.payGram.eaphni[key] = this.eaphni.controls[key].value;
    // });

    // Object.keys(this.eaphni.controls).forEach( key => {
    //   this.payGram.masterFormGroupings[key] = this.masterFormGroupings.controls[key].value;
    // });

    const dataLoadGram = [];
    this.payGram.loginCred = this.loginCredentials.value;
    this.payGram.personalInformation = this.personalInformation.value;
    this.payGram.eaphni = this.eaphni.value;
    this.payGram.masterFormGroupings = this.masterFormGroupings.value;

    // send the preview page to show
    // this.router.navigate(['/preview-cv'] , {queryParams: {'payload' : JSON.stringify(this.payGram)} } ) ;
    this.saveAllFormsValues();

    this.cacheService.payloadData = JSON.stringify(this.payGram);
    this.router.navigate(['/preview-cv']);
    // this.router.navigate(['/preview-cv', JSON.stringify(this.payGram)]);




    // (Array)(this.loginCredentials.value).forEach(v => {
    //   dataLoadGram.push(v);
    // });

    // (Array)(this.personalInformation.value).forEach(v => {
    //   dataLoadGram.push(v);
    // });

    // (Array)(this.eaphni.value).forEach(v => {
    //   dataLoadGram.push(v);
    // });

    // (Array)(this.masterFormGroupings.value).forEach(v => {
    //   dataLoadGram.push(v);
    // });


    // // console.log(JSON.stringify(this.payGram));
    // // console.log(JSON.stringify(dataLoadGram));
    // // send the data to the server
    // this.blurDocument(true);
    // this.httpRequest.sendApplicantInformation(this.payGram).subscribe(data => {
    //   // this.httpRequest.sendApplicantInformation(dataLoadGram).subscribe( data => {
    //   // console.log('Response Message', data);
    //   // this.router.navigate(['/userdashboard']);
    //   this.blurDocument(false);
    //   this.cacheService.registered = true;
    //   this.addSuccessMessage('Your Registration was successfull , please proceed to uploads files...');
    //   setTimeout(() => {
    //     // window.open('http://localhost:4300', '_self');

    //     // disable the file upload navigation from the front end app
    //     // this.router.navigate(['/fileuploads', this.loginCredentials.get('SpNo').value]);


    //     // navigate back to the home page after successful cv
    //   }, 2000);

    // }, (error: HttpErrorResponse) => {
    //   if (error.status === 500) {
    //     // console.log('Server error occured please contact admin');
    //     this.addErrorMessage('Failed to submit registration form data');
    //   } else {
    //     // console.log(error);
    //   }
    // });
  }

  public done() {
    this.router.navigateByUrl('http://localhost:8083'); // user dashboard login page
  }

  public blurDocument(cond) {
    this.showBlurBackgroundOverlay = cond;
  }


  uploadAllSelectedFiles() {

  }


  /****************************
   * Form fieds initialisation
   * **************************
   */


  get formDataPersonalInformation() {
    return {
      '0': <FormArray>this.personalInformation.get('phoneNumbers'),
      '1': <FormArray>this.personalInformation.get('emailAddresses'),
      '2': <FormArray>this.personalInformation.get('contactAddresses'),
    };
  }




  get formDataEaphni() {
    return this.getEaphiFormControls();
  }

  get formDataMasterFormGroupings() {
    return this.getDataMasterFormGroupingsContols();
  }



  /**

   */
  public getFormValuesFromLocalStorage() {


    // get all the saved form control values 
    const personalFormValues = JSON.parse(window.localStorage.getItem('personalInformation'));
    const eaphiFormValues = JSON.parse(window.localStorage.getItem('eaphni'));
    const masterFormValues = JSON.parse(window.localStorage.getItem('masterFormGroupings'));


    // get each of the saved form control vaues 
    const workExperience = masterFormValues['workExperience'];
    const otherWorkExperience = masterFormValues['otherWorkExperience'];
    const schoolworkexp = masterFormValues['schoolworkexp'];
    const courseDescriptions = masterFormValues['courseDescriptions'];
    const paperReviewing = masterFormValues['paperReviewing'];
    const commendation = masterFormValues['commendation'];
    const researchInterests = masterFormValues['researchInterests'];
    const commissionedProject = masterFormValues['commissionedProject'];
    const conferencesAttended = masterFormValues['conferencesAttended'];
    const papersRead = masterFormValues['papersRead'];
    const refrees = masterFormValues['refrees'];
    const membershipOfProfessionalBodies = masterFormValues['membershipOfProfessionalBodies'];
    const specialAssignmentATE = masterFormValues['specialAssignmentATE'];
    const trainingProgramme = masterFormValues['trainingProgramme'];
    const supervisionPost = masterFormValues['supervisionPost'];
    const supervisionPostPart = masterFormValues['supervisionPostPart'];
    const extraCurriculaActivities = masterFormValues['extraCurriculaActivities'];
    const specialAssignmentMC = masterFormValues['specialAssignmentMC'];
    const specialAssignmentCS = masterFormValues['specialAssignmentCS'];

    const articlesAcc = masterFormValues['publications']['articlesAcc'];
    const books = masterFormValues['publications']['books'];
    const bookArticlesOrChapter = masterFormValues['publications']['bookArticlesOrChapter'];
    const papers = masterFormValues['publications']['papers'];
    const researchInProgress = masterFormValues['publications']['researchInProgress'];
    const technicalReport = masterFormValues['publications']['technicalReport'];
    const thesisDissPro = masterFormValues['publications']['thesisDissPro'];
    const artInP = masterFormValues['publications']['artInP'];
    const editedConf = masterFormValues['publications']['editedConf'];
    const dateAndSignature = masterFormValues['dateAndSignature'];


    const phoneNumbers = personalFormValues['phoneNumbers'];
    const contactAddresses = personalFormValues['contactAddresses'];
    const emailAddresses = personalFormValues['emailAddresses'];


    this.loadFormGroupValues('workExperience', workExperience, this.initWorkExp());
    this.loadFormGroupValues('otherWorkExperience', otherWorkExperience, this.initOtherWorkExp());
    this.loadFormGroupValues('schoolworkexp', schoolworkexp, this.initSchoolWorkExp());
    this.loadFormGroupValues('courseDescriptions', courseDescriptions, this.initCourseDescription());
    this.loadFormGroupValues('paperReviewing', paperReviewing, this.initPaperReviewing());
    this.loadFormGroupValues('commendation', commendation, this.initCommd());
    this.loadFormGroupValues('researchInterests', researchInterests, this.initResearchInterests());
    this.loadFormGroupValues('commissionedProject', commissionedProject, this.initCommissionedProject());
    this.loadFormGroupValues('conferencesAttended', conferencesAttended, this.initConferenceAttended());
    this.loadFormGroupValues('papersRead', papersRead, this.initPaper());
    this.loadFormGroupValues('refrees', refrees, this.initRefree());
    this.loadFormGroupValues('membershipOfProfessionalBodies', membershipOfProfessionalBodies, this.initMembershipOfProfessionalBodies());
    this.loadFormGroupValues('specialAssignmentATE', specialAssignmentATE, this.initSpecialAssignemtATE());
    this.loadFormGroupValues('trainingProgramme', trainingProgramme, this.initTrainingProgramme());
    this.loadFormGroupValues('supervisionPost', supervisionPost, this.initSupervisionPost());
    this.loadFormGroupValues('supervisionPostPart', supervisionPostPart, this.initSupervisionPostPart());
    this.loadFormGroupValues('extraCurriculaActivities', extraCurriculaActivities, this.initExtraCurriculaActivities());
    this.loadFormGroupValues('specialAssignmentMC', specialAssignmentMC, this.initSpecialAssignemtMC());
    this.loadFormGroupValues('specialAssignmentCS', specialAssignmentCS, this.initSpecialAssignemtCS());
    this.loadFormGroupValuesPub('articlesAcc', articlesAcc, this.initArticleAcc());
    this.loadFormGroupValuesPub('books', books, this.initBook());
    this.loadFormGroupValuesPub('bookArticlesOrChapter', bookArticlesOrChapter, this.initBookArticlesOrChapter());
    this.loadFormGroupValuesPub('papers', papers, this.initPaper());
    this.loadFormGroupValuesPub('researchInProgress', researchInProgress, this.initResearchInProgress());
    this.loadFormGroupValuesPub('technicalReport', technicalReport, this.initTechnicalReport());
    this.loadFormGroupValuesPub('thesisDissPro', thesisDissPro, this.initThesisDissPro());
    this.loadFormGroupValuesPub('artInP', artInP, this.initArtInP());
    this.loadFormGroupValuesPub('editedConf', editedConf, this.initEditedCP());
    (<FormArray>this.masterFormGroupings.get('dateAndSignature')).setValue(dateAndSignature);


    const educationArray = eaphiFormValues['educationArray'];
    const academicQualifications = eaphiFormValues['academicQualifications'];
    const professionalQualifications = eaphiFormValues['professionalQualifications'];
    const prizes = eaphiFormValues['prizes'];
    const scholarships = eaphiFormValues['scholarships'];
    const honours = eaphiFormValues['honours'];
    const nationalRecommendations = eaphiFormValues['nationalRecommendations'];
    const internationalRecommendations = eaphiFormValues['internationalRecommendations'];


    this.loadFormGroupValuesE('educationArray', educationArray, this.initeaphni());
    this.loadFormGroupValuesE('academicQualifications', academicQualifications, this.initAcademicQualification());
    this.loadFormGroupValuesE('professionalQualifications', professionalQualifications, this.initProfessionalQualification());
    this.loadFormGroupValuesE('prizes', prizes, this.initPHNI());
    this.loadFormGroupValuesE('scholarships', scholarships, this.initScholarship());
    this.loadFormGroupValuesE('honours', honours, this.initPHNI());
    this.loadFormGroupValuesE('nationalRecommendations', nationalRecommendations, this.initPHNI());
    this.loadFormGroupValuesE('internationalRecommendations', internationalRecommendations, this.initPHNI());

    this.personalInformation.patchValue(personalFormValues); // set the partial value of the formgroup
    this.loadFormGroupValuesPer('phoneNumbers', phoneNumbers, this.initPhoneNumber());
    this.loadFormGroupValuesPer('contactAddresses', contactAddresses, this.initContactAddress());
    this.loadFormGroupValuesPer('emailAddresses', emailAddresses, this.initEmailAdress());

  }

  private loadFormGroupValues(formGroupName: string, formGroupObject: Array<Object>, formGroup: FormGroup): boolean {
    (<FormArray>this.masterFormGroupings.get(formGroupName)).removeAt(0);
    for (let index = 0; index < formGroupObject.length; index++) {
      const formValue = formGroup;
      formValue.setValue(formGroupObject[index]);
      (<FormArray>this.masterFormGroupings.get(formGroupName)).push(formValue);
    }
    return true;
  }


  private loadFormGroupValuesE(formGroupName: string, formGroupObject: Array<Object>, formGroup: FormGroup): boolean {
    (<FormArray>this.eaphni.get(formGroupName)).removeAt(0);
    for (let index = 0; index < formGroupObject.length; index++) {
      const formValue = formGroup;
      formValue.setValue(formGroupObject[index]);
      (<FormArray>this.eaphni.get(formGroupName)).push(formValue);
    }
    return true;
  }



  private loadFormGroupValuesPub(formGroupName: string, formGroupObject: Array<Object>, formGroup: FormGroup): boolean {
    (<FormArray>this.masterFormGroupings.get('publications').get(formGroupName)).removeAt(0);
    for (let index = 0; index < formGroupObject.length; index++) {
      const formValue = formGroup;
      formValue.setValue(formGroupObject[index]);
      (<FormArray>this.masterFormGroupings.get('publications').get(formGroupName)).push(formValue);
    }
    return true;
  }


  private loadFormGroupValuesPer(formGroupName: string, formGroupObject: Array<Object>, formGroup: FormGroup): boolean {
    (<FormArray>this.personalInformation.get(formGroupName)).removeAt(0);
    for (let index = 0; index < formGroupObject.length; index++) {
      const formValue = formGroup;
      formValue.setValue(formGroupObject[index]);
      (<FormArray>this.personalInformation.get(formGroupName)).push(formValue);
    }
    return true;
  }




  FORM_INIT() {
    this.personalInformation = this.fb.group({
      nameInFull: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      placeOfBirth: new FormControl('', Validators.required),
      age: new FormControl('', [Validators.required, Validators.pattern('\\d*')]),
      sex: new FormControl('', Validators.required),
      maritalStatus: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      nationality: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      townAndStateOfOrigin: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      lga: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
      phoneNumbers: this.fb.array([this.initPhoneNumber()]),
      emailAddresses: this.fb.array([this.initEmailAdress()]),
      contactAddresses: this.fb.array([this.initContactAddress()]),
      presentPostAndSalary: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*', 'g'))]),
      postOnPromotion: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    });

    this.loginCredentials = this.fb.group({
      SpNo: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      dateReg: new FormControl(Date())
    });

    this.loginCredentials.get('SpNo').valueChanges.subscribe(data => {
      // console.log('has ERROR ', this.loginCredentials.get('SpNo').hasError('exists'));
    });

    /**
     * The survey form questions sections
     */
    this.eaphni = this.fb.group({
      educationArray: this.fb.array([this.initeaphni()]),
      academicQualifications: this.fb.array([this.initAcademicQualification()]),
      professionalQualifications: this.fb.array([this.initProfessionalQualification()]),
      prizes: this.fb.array([this.initPHNI()]),
      scholarships: this.fb.array([this.initScholarship()]),
      honours: this.fb.array([this.initPHNI()]),
      nationalRecommendations: this.fb.array([this.initPHNI()]),
      internationalRecommendations: this.fb.array([this.initPHNI()]),
    });

    /***********************************************
     * INITIALISATIONS
     */
    this.workExperience = this.fb.array([this.initWorkExp()]);
    this.otherWorkExperience = this.fb.array([this.initWorkExp()]);
    this.schoolworkexp = this.fb.array([this.initSchoolWorkExp()]);
    this.commendation = this.fb.array([this.initCommd()]);
    this.courseDescriptions = this.fb.array([this.initCourseDescription()]);
    this.paperReviewing = this.fb.array([this.initPaperReviewing()]);

    // this.publications = this.fb.array([this.initPub()]);
    this.publications = this.fb.group({
      // articles in learned journals
      // articlesInLeanedJournals: this.fb.array([this.initArticlesInLearnedJournals()]),
      artInP: this.fb.array([this.initArtInP()]),
      articlesAcc: this.fb.array([this.initArticleAcc()]),
      books: this.fb.array([this.initBook()]),
      bookArticlesOrChapter: this.fb.array([this.initBookArticlesOrChapter()]),
      editedConf: this.fb.array([this.initEditedCP()]),
      researchInProgress: this.fb.array([this.initResearchInProgress()]),
      technicalReport: this.fb.array([this.initTechnicalReport()]),
      thesisDissPro: this.fb.array([this.initThesisDissPro()]),
      papers: this.fb.array([this.initPaper()]),

    });
    this.refrees = this.fb.array([this.initRefree()]);
    this.dateAndSignature = this.fb.group({
      dateSigned: new FormControl('', [Validators.required]),
      signature: new FormControl(this.pointSigned),
      base64Image: new FormControl('')
    });

    this.membershipOfProfessionalBodies = this.fb.array([this.initMembershipOfProfessionalBodies()]);
    this.specialAssignmentATE = this.fb.array([this.initSpecialAssignemtATE()]);
    this.specialAssignmentMC = this.fb.array([this.initSpecialAssignemtMC()]);
    this.specialAssignmentCS = this.fb.array([this.initSpecialAssignemtCS()]);
    this.trainingProgramme = this.fb.array([this.initTrainingProgramme()]);
    this.extraCurriculaActivities = this.fb.array([this.initExtraCurriculaActivities()]);
    this.researchInterests = this.fb.array([this.initResearchInterests()]);
    this.researchInProgress = this.fb.array([this.initResearchInProgress()]);
    this.commissionedProject = this.fb.array([this.initCommissionedProject()]);

    this.fellowship = this.fb.array([this.initFellowship()]);
    this.supervisionPost = this.fb.array([this.initSupervisionPost()]);
    this.supervisionPostPart = this.fb.array([this.initSupervisionPostPart()]);
    this.conferencesAttended = this.fb.array([this.initConferenceAttended()]);
    this.papersRead = this.fb.array([this.initPaper()]);

    this.masterFormGroupings = this.fb.group({
      workExperience: this.workExperience,
      otherWorkExperience: this.otherWorkExperience,
      schoolworkexp: this.schoolworkexp,
      courseDescriptions: this.courseDescriptions,
      paperReviewing: this.paperReviewing,
      commendation: this.commendation,
      researchInterests: this.researchInterests,
      commissionedProject: this.commissionedProject,
      publications: this.publications,
      conferencesAttended: this.conferencesAttended,
      papersRead: this.papersRead,
      refrees: this.refrees,
      membershipOfProfessionalBodies: this.membershipOfProfessionalBodies,
      specialAssignmentATE: this.specialAssignmentATE,
      specialAssignmentMC: this.specialAssignmentMC,
      specialAssignmentCS: this.specialAssignmentCS,
      trainingProgramme: this.trainingProgramme,
      fellowship: this.fellowship,
      supervisionPost: this.supervisionPost,
      supervisionPostPart: this.supervisionPostPart,
      extraCurriculaActivities: this.extraCurriculaActivities,
      dateAndSignature: this.dateAndSignature,

    });
    // the form fields values to send to the server 
    this.payGram.personalInformation = {};
    this.payGram.eaphni = {};
    this.payGram.masterFormGroupings = {};
    this.finalStage = this.fb.group({});
  }

  /**
   *
   */
  addErrorMessage(details) {
    this.messageService.add({ severity: 'error', summary: 'Your File WAS NOT uploaded successfully', detail: details });
  }

  /**
   *
   * @param details
   */
  addSuccessMessage(details) {
    this.messageService.add({ severity: 'success', summary: 'Your Fileuploaded successfully', detail: details });
  }


  /**
   * 
   * @param event 
   */
  onStrengthChanged(event) {

  }

  asynchronousValidators() {

    /***********************************
     * Custom asynchronous validator
     * *********************************
     */
    this.loginCredentials.get('SpNo').valueChanges.subscribe(data => {
      this.httpRequest.checkSpNo(this.loginCredentials.get('SpNo').value).subscribe(
        dat => {
          if (dat.exists) {
            this.SpNoCond = true;
          } else {
            this.SpNoCond = false;
          }
        }
      );
    });
  }


  public populateFormValues(): void {
    // save in local storage here
    // this.personalInformation.patchValue(JSON.parse(window.localStorage.getItem('personalInformation')));
    // this.loginCredentials.patchValue(JSON.parse(window.localStorage.getItem('loginCredentials')));
    // this.eaphni.patchValue(JSON.parse(window.localStorage.getItem('eaphni')));
    // this.masterFormGroupings.patchValue(JSON.parse(window.localStorage.getItem('masterFormGroupings')));

    // console.log(JSON.parse(window.localStorage.getItem('masterFormGroupings')));
    this.getFormValuesFromLocalStorage();

  }

  /**
   * This public function saves all the input form values the
   * user as entered into the CV Documentation Page
   */
  public saveAllFormsValues(): void {
    this.dateAndSignature.controls.signature.setValue(this.signaturePad.toData());
    window.localStorage.setItem('personalInformation', JSON.stringify(this.personalInformation.value));
    window.localStorage.setItem('loginCredentials', JSON.stringify(this.loginCredentials.value));
    window.localStorage.setItem('eaphni', JSON.stringify(this.eaphni.value));
    window.localStorage.setItem('masterFormGroupings', JSON.stringify(this.masterFormGroupings.value));
    this.messageService.add({
      severity: 'success', summary: 'Details Saved Successfully',
      detail: 'Your Form Fields inputs have been saved'
    });

    // console.log(JSON.parse(window.localStorage.getItem('personalInformation')));
    // console.log(JSON.parse(window.localStorage.getItem('loginCredentials')));
    // console.log(JSON.parse(window.localStorage.getItem('eaphni')));
    // console.log(JSON.parse(window.localStorage.getItem('masterFormGroupings')));

  }



  /**
   * Delete all the saved values inside the local storage of the browser
   */
  public deleteAllSavedFormsValues(): void {
    // save in local storage here
    window.localStorage.removeItem('personalInformation');
    window.localStorage.removeItem('loginCredentials');
    window.localStorage.removeItem('eaphni');
    window.localStorage.removeItem('masterFormGroupings');

    this.messageService.add({
      severity: 'success', summary: 'Form Details Cleared Successfully',
      detail: 'Successful!'
    });

    setTimeout(() => {
      // window.location.reload(true);
      this.router.navigate(['/cv-documentation']);
    }, 1000);

  }



  private getDataMasterFormGroupingsContols(): Object {
    return {
      '0': <FormArray>this.masterFormGroupings.get('workExperience'),
      '1': <FormArray>this.masterFormGroupings.get('otherWorkExperience'),
      '2': <FormArray>this.masterFormGroupings.get('schoolworkexp'),
      '3': <FormArray>this.masterFormGroupings.get('courseDescriptions'),
      '4': <FormArray>this.masterFormGroupings.get('paperReviewing'),
      '5': <FormArray>this.masterFormGroupings.get('commendation'),
      '6': <FormArray>this.masterFormGroupings.get('researchInterests'),
      '7': <FormArray>this.masterFormGroupings.get('commissionedProject'),
      '8': <FormArray>this.masterFormGroupings.get('publications'),
      '9': <FormArray>this.masterFormGroupings.get('conferencesAttended'),
      '10': <FormArray>this.masterFormGroupings.get('papersRead'),
      '11': <FormArray>this.masterFormGroupings.get('refrees'),
      '12': <FormArray>this.masterFormGroupings.get('membershipOfProfessionalBodies'),
      '13': <FormArray>this.masterFormGroupings.get('specialAssignmentATE'),
      '14': <FormArray>this.masterFormGroupings.get('trainingProgramme'),
      '15': <FormArray>this.masterFormGroupings.get('fellowship'),
      '16': <FormArray>this.masterFormGroupings.get('supervisionPost'),
      '17': <FormArray>this.masterFormGroupings.get('supervisionPostPart'),
      '18': <FormArray>this.masterFormGroupings.get('extraCurriculaActivities'),
      '19': <FormArray>this.masterFormGroupings.get('dateAndSignature'),
      '20': <FormArray>this.masterFormGroupings.get('publications').get('articlesAcc'),
      '21': <FormArray>this.masterFormGroupings.get('publications').get('books'),
      '22': <FormArray>this.masterFormGroupings.get('publications').get('bookArticlesOrChapter'),
      '23': <FormArray>this.masterFormGroupings.get('publications').get('papers'),
      '24': <FormArray>this.masterFormGroupings.get('publications').get('researchInProgress'),
      '25': <FormArray>this.masterFormGroupings.get('publications').get('technicalReport'),
      '26': <FormArray>this.masterFormGroupings.get('publications').get('thesisDissPro'),
      '27': <FormArray>this.masterFormGroupings.get('publications').get('articlesInLeanedJournals'),
      '28': <FormArray>this.masterFormGroupings.get('specialAssignmentMC'),
      '29': <FormArray>this.masterFormGroupings.get('specialAssignmentCS'),
      '30': <FormArray>this.masterFormGroupings.get('publications').get('artInP'),
      '31': <FormArray>this.masterFormGroupings.get('publications').get('editedConf')
    };
  }
  private getEaphiFormControls(): Object {
    return {
      '0': <FormArray>this.eaphni.get('educationArray'),
      '1': <FormArray>this.eaphni.get('academicQualifications'),
      '2': <FormArray>this.eaphni.get('professionalQualifications'),
      '3': <FormArray>this.eaphni.get('prizes'),
      '4': <FormArray>this.eaphni.get('scholarships'),
      '5': <FormArray>this.eaphni.get('honours'),
      '6': <FormArray>this.eaphni.get('nationalRecommendations'),
      '7': <FormArray>this.eaphni.get('internationalRecommendations'),
    };
  }
}
interface ValuesInterface {
  key: string;
  value: string;
}

interface PayLoadInterface {
  masterFormGroupings: Object;
  personalInformation: Object;
  eaphni: Object;
  loginCred: Object;
}
