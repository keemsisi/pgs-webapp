import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CacheService } from '../services/cache.service';
import { CustomHttpServicesService } from '../services/custom-http-services.service';
import { HttpErrorResponse } from '@angular/common/http';
import * as jspdf from 'jspdf';
import * as html2canvas from 'html2canvas';
import { Observable } from 'rxjs';
import { CVDataModel } from '../models/data.model';
import { DataObjectModel } from '../models/object.model';


@Component({
  selector: 'app-preview-cv',
  templateUrl: './preview-cv.component.html',
  styleUrls: ['./preview-cv.component.css']
})
export class PreviewCvComponent extends CVDataModel implements OnInit {
  personalInformation: Object = {};
  info: Array<Object> = [{}];
  eaphni: Array<Object> = [{}];
  masterFormGroupings: Array<Object> = [{}];

  spNumber: String;
  payloadData: FormGroup;
  base64Img = null;
  margins = {
    top: 70,
    bottom: 40,
    left: 30,
    width: 550
  };

  objectSource : {} = new DataObjectModel().model ;

  @Input('dashboardCV') dashboardCV: Object;

  showBlurBackgroundOverlay = false;
  hideCard = false;


  romanNumbering = ['(i)', '(ii)', '(iii)', '(iv)', '(v)', '(vi)', '(vii)', '(viii)', '(ix)', '(x)', '(xi)', '(xii)', '(xiii)'];

  @ViewChild('createdCV', { static: true }) createdCV: ElementRef;

  @Input() showCard: Boolean = true;
  @Input() showHeader: Boolean = true;

  objectDataSource = new DataObjectModel().model ;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router, 
    private messageService: MessageService,
    private httpRequest: CustomHttpServicesService,
    private cacheService: CacheService,
    private fb: FormBuilder
  ) {

    /**
     * The superclass to init all inhereted attributes , functions and modules 
     */
    super(); //initailise the  super class before the rest

  }


  ngOnInit() {

    if (this.activatedRoute.snapshot.paramMap.has('spNumber')) {

      this.processOne();
      // } else if (this.activatedRoute.snapshot.paramMap.has('payload')) {
      //   this.processTwo();

    }

    else if (this.cacheService.payloadData !== undefined ) {
      console.log("Processing two already....");
      this.processTwo();

    }

    else {

      this.personalInformation = {};
      this.addErrorMessage('No data to load');

    }

  }


  //if the staff data is loaded from the database server then this will run and get the staff stored cv
  private processOne() {
    this.spNumber = this.activatedRoute.snapshot.paramMap.get('spNumber');
    this.getUserInformation(this.spNumber);
    console.log('Preview One and the othter proces...');
    this.loadPersoalInformation();
    this.addSuccessMessage('Your data was loaded successfully');
  }


  //this runs just to preview the cv before submitting to the backend service 
  private processTwo() {
    // this.objectDataSource = JSON.parse(this.activatedRoute.snapshot.paramMap.get('payload')); //get the value of the parameter from the avtivated route
    const payloadData =  new DataObjectModel().model ;
    payloadData.personalInformation = JSON.parse(window.localStorage.getItem('personalInformation'));
    payloadData.eaphni = JSON.parse(window.localStorage.getItem('eaphni'));
    payloadData.masterFormGroupings= JSON.parse(window.localStorage.getItem('masterFormGroupings'));
    payloadData['loginCred'] = JSON.parse(window.localStorage.getItem('loginCred'));
    this.objectDataSource = payloadData;
    this.loadPersoalInformation();
    console.log(this.objectDataSource);
    this.processLoadedData();
    // this.addSuccessMessage('Your data was loaded successfully');
    console.log("Message from process two");
  }


  private loadPersoalInformation() {
    let phoneNum = '';
    let contactAdd = '';
    let emailAdd = '';


    //get the personal phone number the staff has suplied 
    for (let index = 0; index < Object.keys(this.objectDataSource['personalInformation']['phoneNumbers']).length; index++) {
      const element = this.objectDataSource['personalInformation']['phoneNumbers'][index]['phoneNumber'];
      // // console.log(element);
      phoneNum += + element + ' , ';
      // console.log(phoneNum);

    }



    //append the contact address suplied by the staff
    for (let index = 0; index < Object.keys(this.objectDataSource['personalInformation']['contactAddresses']).length; index++) {
      const element = this.objectDataSource['personalInformation']['contactAddresses'][index]['contactAddress'];
      // // console.log(element);
      contactAdd += element + ' , ';
      // console.log(contactAdd);

    }


    //get and apend all the email address of the staff entered 
    for (let index = 0; index < Object.keys(this.objectDataSource['personalInformation']['emailAddresses']).length; index++) {
      const element = this.objectDataSource['personalInformation']['emailAddresses'][index]['emailAddress'];
      // console.log(element);
      emailAdd += ' , ' + element;
      // console.log(emailAdd);
    }


    //initialise the personal information of the staff suplied
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
    // this.info = this.objectDataSource['info'];
    this.eaphni =  Array<Object>(this.objectDataSource['eaphni']);
    this.masterFormGroupings = Array<Object>(this.objectDataSource['masterFormGroupings']);
  }

  getUserInformation(spNumber): void {
    this.httpRequest.getUserInformation(spNumber).subscribe(data => {
      this.objectDataSource = data; // assigns the spNumber ;
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



    this.httpRequest.sendApplicantInformation(window.localStorage.getItem('spNumber') ,this.objectDataSource).subscribe(data => {
      // console.log('Response Message', data);
      this.blurDocument(false);
      this.cacheService.registered = true;
      this.addSuccessMessage('Your Registration was successfull , please proceed to uploads files...');
      setTimeout(() => {
        // this.router.navigate(['/']);
        // this.deleteAllSavedFormsValues();
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
    window.localStorage.removeItem('info');
    window.localStorage.removeItem('eaphni');
    window.localStorage.removeItem('masterFormGroupings');
  }

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
    //     'loginCred': { 'spNumber': '', 'password': '', 'dateReg': 'Fri Jul 26 2019 23:05:19 GMT+0100 (West Africa Standard Time)' }
    //   };


    // this.personalInformation = this.objectDataSource['personalInformation'];
    // this.masterFormGroupings = this.objectDataSource['masterFormGroupings'];
    // this.eaphni = this.objectDataSource['eaphni'];
    // this.info = this.objectDataSource['info'];

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