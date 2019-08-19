import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CacheService } from '../servies/cache.service';
import { CustomHttpServicesService } from '../servies/custom-http-services.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';


@Component({
  selector: 'app-preview-cv',
  templateUrl: './preview-cv.component.html',
  styleUrls: ['./preview-cv.component.css']
})
export class PreviewCvComponent implements OnInit {
  personalInformation: Object = {};
  loginCredentials: Array<Object> = [{}];
  eaphni: Array<Object> = [{}];
  masterFormGroupings: Array<Object> = [{}];

  username: String;
  payloadData: FormGroup;
  base64Img = null;
  margins = {
    top: 70,
    bottom: 40,
    left: 30,
    width: 550
  };

  ELEMENT_DATA: PeriodicElement[] = [];
  EDU_DATA: PeriodicElement[] = [];
  WORk_DATA: PeriodicElement[] = [];
  COURSES_TAUGHT_DATA: PeriodicElement[] = [];
  COURSES_DESCRIPTION_DATA: PeriodicElement[] = [];
  showBlurBackgroundOverlay = false;
  hideCard = false;



  displayedColumns: string[] = ['no', 'name', 'value'];
  workExperienceDisplayColumn: string[] = ['no', 'organization', 'postHeld', 'duties', 'fromDate', 'toDate'];
  otherWorkDisplayColumn: string[] = ['no', 'organization', 'postHeld', 'duties', 'fromDate', 'toDate'];
  schoolworkexpDisplayColumn: string[] =
    ['courseCode', 'creditHours', 'numOfLecturers', 'numberOfRegStd', 'contribution', 'session', 'school', 'level'];
  courseDescriptionsDisplayColumn: string[] = ['no', 'courseCode', 'courseTitle'];
  commendationDisplayColumn: string[] = ['no', 'by', 'commendationFor', 'commendationDate'];
  researchInterestsDisplayColumn: string[] = ['no', 'interest'];
  commissionedProjectDisplayColumn: string[] = ['no', 'commissionedProject'];
  articlesAccDisplayColumn: string[] = ['no', 'pubName', 'title', 'publisher', 'sn', 'availableAt', 'used', 'lf', 'journalAc'];
  artInPDisplayColumn: string[] = ['no', 'pubName', 'title', 'publisher', 'sn', 'availableAt', 'used', 'lf', 'journalA'];
  booksDisplayColumn: string[] = ['no', 'book', 'used'];
  bookArticlesOrChapterDisplayColumn: string[] = ['no', 'bookArtChapt', 'used'];
  editedConfDisplayColumn: string[] = ['no', 'pubName', 'title', 'publisher', 'sn', 'availableAt', 'used', 'lf', 'editCP'];
  technicalReportDisplayColumn: string[] = ['no', 'report'];
  researchInProgressDisplayColumn: string[] = ['no', 'researchInProgress'];
  thesisDissProDisplayColumn: string[] = ['no', 'thesis'];
  papersDisplayColumn: string[] = ['no', 'paper', 'used'];
  conferencesAttendedDisplayColumn: string[] = ['no', 'confPapR'];
  paperDisplayColumn: string[] = ['no', 'confPapR', 'used'];
  refreesDisplayColumn: string[] = ['no', 'refreeFullName', 'occupation', 'phoneNumber', 'address', 'email'];
  papersReadDisplayColumn: string[] = ['no', 'paper', 'used'];
  membershipOfProfessionalBodiesDisplayColumn: string[] = ['no', 'postHeld', 'organization', 'no'];
  specialAssignmentATEDisplayColumn: string[] = ['no', 'postHeld', 'organization', 'fromDate', 'toDate'];
  specialAssignmentMCDisplayColumn: string[] = ['no', 'postHeld', 'organization', 'fromDate', 'toDate'];
  specialAssignmentCSDisplayColumn: string[] = ['no', 'postHeld', 'communityServiceDescription', 'fromDate', 'toDate'];
  trainingProgrammeDisplayColumn: string[] = ['no', 'description', 'training'];
  fellowshipProgrammeDisplayColumn: string[] = ['no', 'post', 'organization', 'date'];
  supervisionPostDisplayColumn: string[] = ['no', 'title', 'nameOfStudent', '_d1', '_d2', 'soleColla', 'degree'];
  extraCurriculaActivitiesDisplayColumn: string[] = ['no', 'activity'];
  educationArrayDisplayColumn: string[] = ['no', 'schoolAttended', 'fromDate', 'toDate'];
  academicQualificationsDisplayColumn: string[] = ['no', 'title', 'date'];
  professionalQualificationsDisplayColumn: string[] = ['no', 'title', 'date'];
  prizesDisplayColumn: string[] = ['no', 'title', 'date'];
  honoursDisplayColumn: string[] = ['no', 'title', 'date'];
  scholarshipsDisplayColumn: string[] = ['no', 'receivedFrom', 'title', 'date'];
  nationalRecommendationsDisplayColumn: string[] = ['no', 'receivedFrom', 'title', 'date'];
  internationalRecommendationsDisplayColumn: string[] = ['no', 'receivedFrom', 'title', 'date'];
  loginCredRecommendationsDisplayColumn: string[] = ['no', 'username', 'password', 'dateReg'];
  paperReviewingDisplayColumn: string[] = ['no', 'paperR'];

  displayEdu: string[] = ['no', 'edu', 'fromDate', 'toDate'];
  dataSource = this.ELEMENT_DATA;

  objectDataSource =
    {
      'masterFormGroupings':
      {
        'workExperience': [{}],
        'otherWorkExperience': [{}],
        'schoolworkexp': [{}],
        'courseDescriptions': [{}],
        'conferencesAttended': [{}],
        'papersRead': [{}],
        'refrees': [{}],
        'membershipOfProfessionalBodies': [{}],
        'specialAssignmentATE': [{}],
        'specialAssignmentMC': [{}],
        'specialAssignmentCS': [{}],
        'trainingProgramme': [{}],
        'fellowship': [{}],
        'supervisionPost': [{}],
        'supervisionPostPart': [{}],
        'extraCurriculaActivities': [{}],
        'dateAndSignature': { 'base64Image': '', 'signature': '', 'dateSigned': '' },
        'paperReviewing': [{}],
        'commendation': [{}],
        'researchInterests': [{}],
        'commissionedProject': [{}],
        'publications': {
          'artInP': [{}],
          'articlesAcc': [{}],
          'books': [{}],
          'bookArticlesOrChapter': [{}],
          'editedConf': [{}],
          'researchInProgress': [{}],
          'technicalReport': [{}],
          'thesisDissPro': [{}],
          'papers': [{}]
        }
      },
      'eaphni': {
        'educationArray': [{}],
        'academicQualifications': [{}],
        'professionalQualifications': [{}],
        'prizes': [{}],
        'honours': [{}],
        'nationalRecommendations': [{}],
        'internationalRecommendations': [{}]
      },
      'personalInformation': {},
      'loginCredentials': [{}]
    };
  romanNumbering = ['(i)', '(ii)', '(iii)', '(iv)', '(v)', '(vi)', '(vii)', '(viii)', '(ix)', '(x)', '(xi)', '(xii)', '(xiii)'];


  @ViewChild('createdCV') createdCV: ElementRef;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private httpRequest: CustomHttpServicesService,
    private cacheService: CacheService,
    private fb: FormBuilder
  ) {


    if (this.activatedRoute.snapshot.paramMap.has('username')) {
      this.processOne();
    // } else if (this.activatedRoute.snapshot.paramMap.has('payload')) {
    //   this.processTwo();
     } else if (this.cacheService.payloadData !== '') {
        this.processTwo();
    } else {
      this.personalInformation = {} ;
      this.addErrorMessage('No data to load');
    }

    // this.objectDataSource =

    //   {
    //     'masterFormGroupings': {
    //       'workExperience': [{ 'organization': '', 'postHeld': '', 'duties': '', 'fromDate': '', 'toDate': '' }],
    //       'otherWorkExperience': [{ 'organization': '', 'postHeld': '', 'duties': '', 'fromDate': '', 'toDate': '' }],
    //       'schoolworkexp': [{
    //         'courseCode': '', 'creditHours': '', 'numOfLecturers': '',
    //         'numberOfRegStd': '', 'contribution': '', 'session': '', 'school': '', 'level': ''
    //       }],
    //       'courseDescriptions': [{ 'courseCode': '', 'courseTitle': '' }],
    //       'paperReviewing': [{ 'paperR': '' }],
    //       'commendation': [{ 'by': 'AKEEM', 'commendationFor': '', 'commendationDate': '' }],
    //       'researchInterests': [{ 'interest': '' }],
    //       'commissionedProject': [{ 'commissionedProject': '' }],

    //       'publications': {
    //         'artInP': [{ 'journalA': '', 'used': '' }],
    //         'articlesAcc': [{ 'journalAc': '', 'used': '' }],
    //         'books': [{ 'book': '', 'used': '' }],
    //         'bookArticlesOrChapter': [{ 'bookArtChapt': '', 'used': '' }],
    //         'editedConf': [{ 'editCP': '', 'used': '' }],
    //         'researchInProgress': [{ 'researchInProgress': '' }],
    //         'technicalReport': [{ 'report': '' }],
    //         'thesisDissPro': [{ 'thesis': '' }],
    //         'papers': [{ 'paper': '', 'used': '' }]
    //       },


    //       'conferencesAttended': [{ 'confPapR': '' }],
    //       'papersRead': [{ 'paper': '', 'used': '' }],
    //       'refrees': [{ 'refreeFullName': '', 'occupation': '', 'phoneNumber': '', 'address': '', 'email': '' }],
    //       'membershipOfProfessionalBodies': [{ 'postHeld': '', 'organization': '', 'no': '' }],
    //       'specialAssignmentATE': [{ 'postHeld': '', 'organization': '', 'fromDate': '', 'toDate': '' }],
    //       'specialAssignmentMC': [{ 'postHeld': '', 'organization': '', 'fromDate': '', 'toDate': '' }],
    //       'specialAssignmentCS': [{ 'postHeld': '', 'communityServiceDescription': '', 'fromDate': '', 'toDate': '' }],
    //       'trainingProgramme': [{ 'training': '', 'description': '' }],
    //       'fellowship': [{ 'post': '', 'organization': '', 'date': '' }],
    //       'supervisionPost': [{ 'title': '', 'nameOfStudent': '', '_d1': '', '_d2': '', 'soleColla': '', 'degree': '' }],
    //       'supervisionPostPart': [{ 'title': '', 'nameOfStudent': '', '_d1': '', '_d2': '', 'soleColla': '', 'degree': '' }],
    //       'extraCurriculaActivities': [{ 'activity': '' }],
    //       'dateAndSignature': { 'dateSigned': '', 'signature': null, 'base64Image': '' },
    //     },

    //     'personalInformation': {
    //       'nameInFull': '',
    //       'dob': '',
    //       'placeOfBirth': '',
    //       'age': '', 'sex': '',
    //       'maritalStatus': '',
    //       'nationality': '',
    //       'town': '',
    //       'townAndStateOfOrigin': '',
    //       'lga': '',
    //       'phoneNumbers': [{ 'phoneNumber': '' }],
    //       'emailAddresses': [{ 'emailAddress': '' }],
    //       'contactAddresses': [{ 'contactAddress': '' }],
    //       'presentEmployer': '',
    //       'presentPostAndSalary': '',
    //       'postOnPromotion': '',
    //     },

    //     'eaphni': {
    //       'educationArray': [{ 'schoolAttended': '', 'fromDate': '', 'toDate': '' }]
    //       , 'academicQualifications': [{ 'receivedFrom': '', 'title': '', 'date': '' }],
    //       'professionalQualifications': [{ 'receivedFrom': '', 'date': '' }],
    //       'prizes': [{ 'receivedFrom': '', 'title': '', 'date': '' }], 'scholarships': [{ 'receivedFrom': '', 'title': '', 'date': '' }],
    //       'honours': [{ 'receivedFrom': '', 'title': '', 'date': '' }],
    //       'nationalRecommendations': [{ 'receivedFrom': '', 'title': '', 'date': '' }],
    //       'internationalRecommendations': [{ 'receivedFrom': '', 'title': '', 'date': '' }]
    //     },
    //     'loginCred': { 'username': '', 'password': '', 'dateReg': 'Fri Jul 26 2019 23:05:19 GMT+0100 (West Africa Standard Time)' }
    //   };


    // this.personalInformation = this.objectDataSource['personalInformation'];
    // this.masterFormGroupings = this.objectDataSource['masterFormGroupings'];
    // this.eaphni = this.objectDataSource['eaphni'];
    // this.loginCredentials = this.objectDataSource['loginCredentials'];

    // const phoneNum = '';
    // const contactAdd = '';
    // const emailAdd = '';

    // Array<Object>(this.personalInformation['phoneNumbers']).forEach((phone) => {
    //   phoneNum.concat(`<li>${phoneNum}</li>`);
    // });


    // Array<Object>(this.personalInformation['contactAddresses']).forEach((comtact) => {
    //   phoneNum.concat(`<li>${contactAdd}</li>`);

    // });

    // Array<Object>(this.personalInformation['emailAddresses']).forEach((email) => {
    //   phoneNum.concat(`<li>${emailAdd}</li>`);
    // });


    // this.ELEMENT_DATA = [{ name: 'NAME IN FULL ', value: '' },
    // { name: 'DATE OF BIRTH', value: 'JUNE 14' },
    // { name: 'PLACE OF BIRTH', value: '' },
    // { name: 'AGE', value: '' },
    // { name: 'SEX', value: '' },
    // { name: 'MARITAL STATUS', value: '' },
    // { name: 'NATIONALITY', value: '' },
    // { name: 'TOWN AND STATE OF ORIGIN', value: '' },
    // { name: 'LOCAL GOVERNMENT AREA', value: '' },
    // { name: 'NATIONALITY', value: '' },
    // { name: 'PHONE NUMBER', value: phoneNum },
    // { name: 'CONTACT ADDRESS', value: contactAdd },
    // { name: 'EMAIL ADDRESSES', value: emailAdd },
    // { name: 'PRESENT POST AND SALARY', value: '' },
    // { name: 'POST ON PROMOTION', value: '' }
    // ];

  }


  ngOnInit() {

  }


  public processOne() {
    this.username = this.activatedRoute.snapshot.paramMap.get('username');
    this.getUserInformation(this.username);
    this.tempo();
    this.addSuccessMessage('Your data was loaded successfully');
  }

  public processTwo() {
    // this.objectDataSource = JSON.parse(this.activatedRoute.snapshot.paramMap.get('payload'));
    this.objectDataSource = JSON.parse(this.cacheService.payloadData);
    this.tempo();
    // console.log(this.objectDataSource);
    this.processLoadedData();
    this.addSuccessMessage('Your data was loaded successfully');
  }


  public tempo() {
    let phoneNum = '';
    let contactAdd = '';
    let emailAdd = '';

    for (let index = 0; index < Object.keys(this.objectDataSource['personalInformation']['phoneNumbers']).length; index++) {
      const element = this.objectDataSource['personalInformation']['phoneNumbers'][index]['phoneNumber'];
      // // console.log(element);
      phoneNum  += ' , ' + element ;
      // console.log(phoneNum);

    }



    for (let index = 0; index < Object.keys(this.objectDataSource['personalInformation']['contactAddresses']).length; index++) {
      const element = this.objectDataSource['personalInformation']['contactAddresses'][index]['contactAddress'];
      // // console.log(element);
      contactAdd  += ' ,  ' + element  ;
      // console.log(contactAdd);

    }


    for (let index = 0; index < Object.keys(this.objectDataSource['personalInformation']['emailAddresses']).length; index++) {
      const element = this.objectDataSource['personalInformation']['emailAddresses'][index]['emailAddress'];
      //console.log(element);
      emailAdd  +=' , ' + element ;
      // console.log(emailAdd);
    }


    this.ELEMENT_DATA = [{ name: 'NAME IN FULL ', value: this.objectDataSource['personalInformation']['nameInFull'] },
    { name: 'DATE OF BIRTH', value: this.objectDataSource['personalInformation']['dob'] },
    { name: 'PLACE OF BIRTH', value: this.objectDataSource['personalInformation']['placeOfBirth'] },
    { name: 'AGE', value: this.objectDataSource['personalInformation']['age'] },
    { name: 'SEX', value: this.objectDataSource['personalInformation']['sex'] },
    { name: 'MARITAL STATUS', value: this.objectDataSource['personalInformation']['maritalStatus'] },
    { name: 'NATIONALITY', value: this.objectDataSource['personalInformation']['nationality'] },
    { name: 'TOWN AND STATE OF ORIGIN', value: this.objectDataSource['personalInformation']['townAndStateOfOrigin'] },
    // { name: 'LOCAL GOVERNMENT AREA', value: this.objectDataSource['personalInformation']['lga'] },
    { name: 'CONTACT ADDRESS', value: contactAdd.toString() },
    { name: 'PHONE NUMBER', value: phoneNum.toString() },
    { name: 'EMAIL ADDRESSES', value: emailAdd.toString() },
    { name: 'PRESENT POST AND SALARY', value: this.objectDataSource['personalInformation']['presentPostAndSalary'] },
    { name: 'POST ON PROMOTION', value: this.objectDataSource['personalInformation']['postOnPromotion'] }
    ];

  }



  public downloadCVAsPDF() {
    // const pdf = new jspdf('p', 'pt', 'letter');
    // // source can be HTML-formatted string, or a reference
    // // to an actual DOM element from which the text will be scraped.
    // const source = this.createdCV;

    // // we support special element handlers. Register them with jQuery-style 
    // // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
    // // There is no support for any other type of selectors 
    // // (class, of compound) at this time.
    // const specialElementHandlers = {
    //   // element with id of "bypass" - jQuery style selector
    //   '#bypassme':  (element, renderer) {
    //     // true = "handled elsewhere, bypass text extraction"
    //     return true;
    //   }
    // };
    // const margins = {
    //   top: 80,
    //   bottom: 60,
    //   left: 40,
    //   width: 522
    // };
    // // all coords and widths are in jsPDF instance's declared units
    // // 'inches' in this case
    // pdf.fromHTML(
    //   source.nativeElement, // HTML string or DOM elem ref.
    //   margins.left, // x coord
    //   margins.top, { // y coord
    //     'width': margins.width, // max width of content on PDF
    //     'elementHandlers': specialElementHandlers
    //   },

    //    (dispose) {
    //     // dispose: object with X, Y of the last line add to the PDF
    //     //          this allow the insertion of new lines after html
    //     pdf.save('Test.pdf');
    //   }, margins);


    const pdf = new jspdf('p', 'pt', 'a4');
    pdf.setFontSize(18);
    pdf.fromHTML(document.getElementById('pdfwrapper'),
      this.margins.left, // x coord
      this.margins.top,
      {
        // y coord
        width: this.margins.width// max width of content on PDF
      }, function (dispose) {
        const totalPages = pdf.internal.getNumberOfPages();

        for (let i = totalPages; i >= 1; i--) { // make this page, the current page we are currently working on.
          pdf.setPage(i);
          pdf.setFontSize(30);
          pdf.setTextColor(40);
          pdf.setFontStyle('normal');

          const margins = {
            top: 70,
            bottom: 40,
            left: 30,
            width: 550
          };

          // if (this.base64Img) {
          //   pdf.addImage(this.base64Img, 'JPEG', this.margins.left, 10, 40, 40);
          // }
          pdf.text('', margins.left + 50, 40);
          pdf.line(3, 70, margins.width + 43, 70); // horizontal line
          // this.toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function(dataUrl) {
          //   // console.log('RESULT:', dataUrl);
          // });
        }
      },
      this.margins);
    const iframe = document.createElement('iframe');
    iframe.setAttribute('style', 'position:absolute;right:0; top:0; bottom:0; height:100%; width:650px; padding:20px;');
    document.body.appendChild(iframe);
    iframe.src = pdf.output('datauristring');

  }



  public headerFooterFormatting(doc) {

  }

  public header(doc) {
    doc.setFontSize(30);
    doc.setTextColor(40);
    doc.setFontStyle('normal');
    if (this.base64Img) {
      doc.addImage(this.base64Img, 'JPEG', this.margins.left, 10, 40, 40);
    }
    doc.text('', this.margins.left + 50, 40);
    doc.line(3, 70, this.margins.width + 43, 70); // horizontal line
    // this.toDataURL('https://www.gravatar.com/avatar/d50c83cc0c6523b4d3f6085295c953e0', function(dataUrl) {
    //   // console.log('RESULT:', dataUrl);
    // });
  }


  toDataURL(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      const reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }

  public printCV(): void {
    this.hideCard = true;
    // console.log(document.getElementsByClassName('card-header'));
    window.print(); // prints the web page
  }


  addErrorMessage(details) {
    this.messageService.add({ severity: 'error', summary: 'Error Message', detail: details });
  }

  addSuccessMessage(details) {
    this.messageService.add({ severity: 'success', summary: 'Success Message', detail: details });
  }


  // process the data recieved from the other view or from the server
  protected processLoadedData() {
    // this.personalInformation = this.objectDataSource['personalInformation'];
    // this.loginCredentials = this.objectDataSource['loginCredentials'];
    // this.eaphni = this.objectDataSource['eaphni'];
    // this.masterFormGroupings = this.objectDataSource['masterFormGroupings'];
  }

  getUserInformation(username): void {
    this.httpRequest.getUserInformation(username).subscribe(data => {
      this.objectDataSource = data; // assigns the username ;
      this.processLoadedData();
    }, (error: HttpErrorResponse) => {
      this.messageService.add({
        severity: 'error', detail: 'Error Message', summary: 'Failed to load user infomation'
      });
    });
  }

  public submit() {
    this.hideCard = true;
    this.blurDocument(true);
    this.httpRequest.sendApplicantInformation(this.objectDataSource).subscribe(data => {
      // console.log('Response Message', data);
      this.blurDocument(false);
      this.cacheService.registered = true;
      this.addSuccessMessage('Your Registration was successfull , please proceed to uploads files...');
      setTimeout(() => {
        this.router.navigate(['/']);
        this.deleteAllSavedFormsValues();
      }, 2000);
    }, (error: HttpErrorResponse) => {
      if (error.status === 500) {
        // console.log('Server error occured please contact admin');
        this.addErrorMessage('Failed to submit registration form data');
      } else {
        // console.log(error);
      }
    });
  }
  public done() {
    this.router.navigateByUrl('http://localhost:8083'); // user dashboard login page
  }
  public blurDocument(cond) {
    this.showBlurBackgroundOverlay = cond;
  }

  public deleteAllSavedFormsValues(): void {
    // save in local storage here
    window.localStorage.removeItem('personalInformation');
    window.localStorage.removeItem('loginCredentials');
    window.localStorage.removeItem('eaphni');
    window.localStorage.removeItem('masterFormGroupings');
  }

}


export interface PeriodicElement {
  name: string;
  value: string | Array<Object>;
}


export interface WorkExperience {
  organization: string;
  postHeld: string;
  duties: string;
  fromDate: string;
  toDate: string;
}

export interface SchoolWorkExperience {
  coursecode: string;
  creditHours: string;
  numOfLecturers: string;
}

export interface NumberOfRegisteredStd {
  contribution: string;
  session: string;
  numOfLecturers: string;
}

export interface CourseDescriptions {
  courseCode: string;
  courseTitle: string;
}

export interface PaperReviewing {
  paperR: string;
}

export interface PaperReviewing {
  title: string;
  commendationFrom: string;
  commendationDate: string;
}

export interface ResearchInterests {
  interest: string;
  outline: string;
}

export interface ResearchInterests {
  interest: string;
  outline: string;
}


