import { DataObjectModel } from './object.model';


export class CVDataModel {

    displayedColumns: string[] = ['no', 'name', 'value'];
    workExperienceDisplayColumn: string[] = ['no', 'organization', 'postHeld', 'duties', 'fromDate', 'toDate'];
    otherWorkDisplayColumn: string[] = ['no', 'organization', 'postHeld', 'duties', 'fromDate', 'toDate'];
    schoolworkexpDisplayColumn: string[] = ['courseCode', 'creditHours', 'numOfLecturers', 'numberOfRegStd', 'contribution', 'session', 'school', 'level'];
    courseDescriptionsDisplayColumn: string[] = ['no', 'courseCode', 'courseTitle'];
    commendationDisplayColumn: string[] = ['no', 'by', 'commendationFor', 'commendationDate'];
    researchInterestsDisplayColumn: string[] = ['no', 'interest'];
    commissionedProjectDisplayColumn: string[] = ['no', 'commissionedProject'];
    articlesAccDisplayColumn: string[] = ['no', 'pubName', 'title', 'publisher', 'sn', 'availableAt', 'used', 'lf', 'journalAc'];
    artInPDisplayColumn: string[] = ['no', 'pubName', 'title', 'publisher', 'sn', 'availableAt', 'used', 'lf', 'journalA' , 'coAuthors' , 'g8Country' , 'volume'];
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
    educationArrayDisplayColumn: string[] = ['no', 'schoolAttended' , 'fromDate', 'toDate'];
    academicQualificationsDisplayColumn: string[] = ['no', 'title', 'degree' , 'date'];
    professionalQualificationsDisplayColumn: string[] = ['no', 'title', 'date'];
    prizesDisplayColumn: string[] = ['no', 'title', 'date'];
    honoursDisplayColumn: string[] = ['no', 'title', 'date'];
    scholarshipsDisplayColumn: string[] = ['no', 'receivedFrom', 'title', 'date'];
    nationalRecommendationsDisplayColumn: string[] = ['no', 'receivedFrom', 'title', 'date'];
    internationalRecommendationsDisplayColumn: string[] = ['no', 'receivedFrom', 'title', 'date'];
    loginCredRecommendationsDisplayColumn: string[] = ['no', 'spNumber', 'password', 'dateReg'];
    paperReviewingDisplayColumn: string[] = ['no', 'paperR'];
  
    displayEdu: string[] = ['no', 'edu', 'fromDate', 'toDate'];

    ELEMENT_DATA: PeriodicElement[] = [];

    dataSource = this.ELEMENT_DATA;
  
    objectDataSource  : Object = new DataObjectModel().model ;

}

export interface PeriodicElement {
    name: string;
    value: string | Array<Object>;
}

