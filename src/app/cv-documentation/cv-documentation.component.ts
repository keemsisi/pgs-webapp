import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { SignaturePad, PointGroup, Point } from 'angular2-signaturepad/signature-pad';
import { CustomHttpServicesService } from '../servies/custom-http-services.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cv-documentation',
  templateUrl: './cv-documentation.component.html',
  styleUrls: ['./cv-documentation.component.css']
})
export class CvDocumentationComponent implements OnInit , AfterViewInit {

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
  educationalBackground: FormGroup;
  workExperience: FormArray;
  refrees: FormArray ;
  publications: FormArray ;
  extraCurricularActivies: FormArray ;
  membershipOfProfessionalBodies: FormArray;
  commendation: FormArray ;
  dateAndSignature: FormGroup ;
  pointSigned: Point[][];
  specialAssignment: FormArray ;
  extraCurriculaActivities: FormArray ;
  finalStage : FormGroup ;
  showBlurBackgroundOverlay: Boolean  =  false ;
  payGram: PayLoadInterface   = {
     masterFormGroupings: {} ,
     personalInformation: {} ,
     educationalBackground : {}
    } ; // the data to send to the server
  masterFormGroupings: FormGroup ;

  

  /**
   * Array of answers from the survey question
   */
  surveyAnswers: { [question: string]: string };

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  private signaturePadOptions: Object = {
    'minWidth': 0.7,
    'canvasWidth': 800,
    'canvasHeight': 500
  };

  constructor(private fb: FormBuilder, private httpRequest: CustomHttpServicesService) {
      this.FORM_INIT() ;
  }

  ngOnInit() {
  }


  /**
   * Method implementation of the AfterViewInit for the signature pad
   */
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  clearSignature() {
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }


  /**
   * The method called by the signature pad on draw complete
   */
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL() === '');
    // point signed on the sign pad and saved into the sign pad
    // this.dateAndSignature.controls['signature'].setValue(this.signaturePad.toData());
    this.dateAndSignature.controls['signature'].setValue(this.signaturePad.toDataURL());

  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }



  initEducationalBackground(): FormGroup {
    return this.fb.group({
      schoolAttended : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
      fromDate : new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
    });
  }


  addEducational(): void{
    const newEdu  = this.fb.group({
      schoolAttended : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
      fromDate : new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
    });

    // push new educational background here 
    (<FormArray>this.educationalBackground.controls['educationArray']).push(newEdu) ;
  }

  /**
   * 
   * @param indexAt The Index of the educational background to remove 
   */
 removeEducational(indexAt: number): boolean {
  (<FormArray>this.educationalBackground.controls['educationArray']).removeAt(indexAt) ;
  return true ;
 }



 initWorkExp(): FormGroup {
  return this.fb.group({
    organization : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
    postHeld : new FormControl('', [Validators.required]),
    fromDate: new FormControl('', [Validators.required]),
    toDate : new FormControl('', [Validators.required]),
  });
}


addWorkExp(): void{
  const newEdu  = this.fb.group({
    organization : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
    postHeld : new FormControl('', [Validators.required]),
    fromDate: new FormControl('', [Validators.required]),
    toDate : new FormControl('', [Validators.required]),
  });

  // push new educational background here
  (<FormArray>this.workExperience).push(newEdu) ;
}

/**
 * 
 * @param indexAt The Index of the educational background to remove 
 */
removeWorkExpIndex(indexAt: number): boolean {
    (<FormArray>this.workExperience).removeAt(indexAt) ;
    return true ;
}




initPub(): FormGroup {
  return this.fb.group({
    title : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
    publicationYear : new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
  });
}


addPub(): void {
  const newEdu  = this.fb.group({
    title : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
    publicationYear : new FormControl('', [Validators.required]),
    publisher: new FormControl('', [Validators.required]),
  });

  // push new educational background here
  (<FormArray>this.publications).push(newEdu) ;
}

/**
 * 
 * @param indexAt The Index of the  Publication to remove 
 */
removePubIndex(indexAt: number): boolean {
    (<FormArray>this.publications).removeAt(indexAt) ;
    return true ;
}


initCommd(): FormGroup {
  return this.fb.group({
    title : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
    commendationYear : new FormControl('',),
  });
}


addCommd(): void {
  const newEdu  = this.fb.group({
    title : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
    commendationYear : new FormControl(''),
  });

  // push new educational background here
  (<FormArray>this.commendation).push(newEdu) ;
}

/**
 *
 * @param indexAt The Index of the Commendation to remove 
 */
removeCommdIndex(indexAt: number): boolean {
    (<FormArray>this.commendation).removeAt(indexAt) ;
    return true ;
}



initRefree(): FormGroup {
  return this.fb.group({
    refreeFullName : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
    occupation : new FormControl(''),
    phoneNumber : new FormControl(''),
    address : new FormControl(''),
  });
}


addRefree(): void {
  const newEdu  = this.fb.group({
    refreeFullName : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
    occupation : new FormControl(''),
    phoneNumber : new FormControl(''),
    address : new FormControl(''),
  });

  // push new educational background here
  (<FormArray>this.refrees).push(newEdu) ;
}

/**
 *
 * @param indexAt The Index of the Commendation to remove 
 */
removeRefreeIndex(indexAt: number): boolean {
    (<FormArray>this.refrees).removeAt(indexAt) ;
    return true ;
}



initMembershipOfProfessionalBodies(): FormGroup {
  return this.fb.group({
    organizationName : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
    yearJoined : new FormControl(''),
    postHeld : new FormControl(''),
  });
}


addMembershipOfProfessionalBodies(): void {
  const newEdu  = this.fb.group({
    organizationName : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
    yearJoined : new FormControl(''),
    postHeld : new FormControl(''),
  });

  // push new here
  (<FormArray>this.membershipOfProfessionalBodies).push(newEdu) ;
}

/**
 *
 * @param indexAt The Index of MembershipOfProfessionalBodies to remove
 */
removeMembershipOfProfessionalBodiesIndex(indexAt: number): boolean {
    (<FormArray>this.membershipOfProfessionalBodies).removeAt(indexAt) ;
    return true ;
}






initSpecialAssignemt(): FormGroup {
  return this.fb.group({
    assignment : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
    description : new FormControl(''),
    year : new FormControl(''),
  });
}


addSpecialAssignment(): void {
  const newEdu  = this.fb.group({
    assignment : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
    description : new FormControl(''),
    year : new FormControl(''),
  });

  // push new here
  (<FormArray>this.specialAssignment).push(newEdu) ;
}

/**
 *
 * @param indexAt The Index of MembershipOfProfessionalBodies to remove
 */
public removeSpecialAssignment(indexAt: number): boolean {
    (<FormArray>this.specialAssignment).removeAt(indexAt) ;
    return true ;
}



public initExtraCurriculaActivities(): FormGroup {
  return this.fb.group({
    assignment : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
    description : new FormControl(''),
    date : new FormControl(''),
  });
}


public addExtraCurriculaActivities(): void {
  const newEdu  = this.fb.group({
    assignment : new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]'))]),
    description : new FormControl(''),
    year : new FormControl(''),
  });

  // push new here
  (<FormArray>this.extraCurriculaActivities).push(newEdu) ;
}

/**
 *
 * @param indexAt The Index of MembershipOfProfessionalBodies to remove
 */
public removeExtraCurriculaActivities(indexAt: number): boolean {
    (<FormArray>this.extraCurriculaActivities).removeAt(indexAt) ;
    return true ;
}

public processApplication() {

  // // master groupings , personal information educational bacgrounds
  // Object.keys(this.educationalBackground.controls).forEach( key => {
  //   this.payGram.personalInformation[key] = this.personalInformation.controls[key].value;
  // });


  // Object.keys(this.educationalBackground.controls).forEach( key => {
  //   if (this.educationalBackground.controls[key].value instanceof Array) {
  //     const arrayToAdd = {} ;
  //     (Array)(this.educationalBackground.controls[key].value).forEach(k=> {
  //       arrayToAdd[k] = this.educationalBackground.controls[key].value ;
  //     })
  //   }
  //   this.payGram.educationalBackground[key] = this.educationalBackground.controls[key].value;
  // });

  // Object.keys(this.educationalBackground.controls).forEach( key => {
  //   this.payGram.masterFormGroupings[key] = this.masterFormGroupings.controls[key].value;
  // });

  this.payGram.personalInformation =  this.personalInformation.value ;
  this.payGram.educationalBackground = this.educationalBackground.value ;
  this.payGram.masterFormGroupings = this.masterFormGroupings.value ;


  // console.log(JSON.stringify(this.payGram)) ;
  // send the data to the server
  this.blurDocument() ;
  this.httpRequest.sendApplicantInformation(JSON.stringify(this.payGram)).subscribe( data => {
      console.log(data) ;
  }, (error: HttpErrorResponse) => {
    if (error.status === 500 ) {
      console.log ('Server error occured please contact admin');
    } else {
      console.log(error) ;
    }
  });
}

public blurDocument() {
  this.showBlurBackgroundOverlay =  true ;
}


/****************************
 * Form fieds initialisation
 * **************************
 */

FORM_INIT () {
  this.personalInformation = this.fb.group({
    nameInFull: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
    placeOfBirth: new FormControl('', Validators.required),
    sex: new FormControl('', Validators.required),
    maritalStatus: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]+'))]),
    nationality: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    town: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    stateOfOrigin: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    lga: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    senatorialDestrict: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    contactAddressOne: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    contactAddressTwo: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    contactAddressThree: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    emailAddress: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    presentEmployer: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
    presentPost: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*', 'g') )]),
    salary: new FormControl('', [Validators.required]),
    postAppliedFor: new FormControl('', [Validators.required, Validators.pattern(new RegExp('[a-zA-Z]*'))]),
  });


  /**
   * The survey form questions sections
   */
  this.educationalBackground = this.fb.group({
    educationArray : this.fb.array([this.initEducationalBackground()]),
    academicAndProfessionalQaulification : this.fb.array([this.initEducationalBackground()]),
    prizes : this.fb.array([this.initEducationalBackground()]),
    honours : this.fb.array([this.initEducationalBackground()]),
    nationalRecognitions : this.fb.array([this.initEducationalBackground()]),
    internationalRecognitions: this.fb.array([this.initEducationalBackground()]),
  });

  /**
   * Thework Experience Section of the form
   */
  this.workExperience = this.fb.array([this.initWorkExp()]);
  this.commendation = this.fb.array([this.initCommd()]);
  this.publications = this.fb.array([this.initPub()]);
  this.refrees = this.fb.array([this.initRefree()]);
  this.dateAndSignature = this.fb.group({
    dateSigned : new FormControl('' , [Validators.required]),
    signature : new FormControl(this.pointSigned, Validators.required)
  });
  this.membershipOfProfessionalBodies =  this.fb.array([this.initMembershipOfProfessionalBodies()]);
  this.specialAssignment =  this.fb.array([this.initSpecialAssignemt()]);
  this.extraCurriculaActivities =  this.fb.array([this.initExtraCurriculaActivities()]);


  this.masterFormGroupings = this.fb.group({
    workExperience : this.workExperience ,
    commendation : this.commendation,
    publications: this.publications,
    refrees: this.refrees,
    membershipOfProfessionalBodies: this.membershipOfProfessionalBodies,
    specialAssignment: this.specialAssignment,
    extraCurriculaActivities: this.extraCurriculaActivities,
    dateAndSignature: this.dateAndSignature
  });

  // the form fields values to send to the server 
  this.payGram.personalInformation = {};
  this.payGram.educationalBackground = {};
  this.payGram.masterFormGroupings = {};

  this.finalStage = this.fb.group({});
}
}

export interface PayLoadInterface {
  personalInformation: Object ;
  educationalBackground: Object ;
  masterFormGroupings: Object ;
}
