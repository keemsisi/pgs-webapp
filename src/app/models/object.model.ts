export class DataObjectModel {
//   model = {
//     'masterFormGroupings':
//     {
//       'workExperience': [{}],
//       'otherWorkExperience': [{}],
//       'schoolworkexp': [{}],
//       'courseDescriptions': [{}],
//       'conferencesAttended': [{}],
//       'papersRead': [{}],
//       'refrees': [{}],
//       'membershipOfProfessionalBodies': [{}],
//       'specialAssignmentATE': [{}],
//       'specialAssignmentMC': [{}],
//       'specialAssignmentCS': [{}],
//       'trainingProgramme': [{}],
//       'fellowship': [{}],
//       'supervisionPost': [{}],
//       'supervisionPostPart': [{}],
//       'extraCurriculaActivities': [{}],
//       'dateAndSignature': { 'base64Image': '', 'signature': '', 'dateSigned': '' },
//       'paperReviewing': [{}],
//       'commendation': [{}],
//       'researchInterests': [{}],
//       'commissionedProject': [{}],
//       'publications': {
//         'artInP': [{}],
//         'articlesAcc': [{}],
//         'books': [{}],
//         'bookArticlesOrChapter': [{}],
//         'editedConf': [{}],
//         'researchInProgress': [{}],
//         'technicalReport': [{}],
//         'thesisDissPro': [{}],
//         'papers': [{}]
//       }
//     },
//     'eaphni': {
//       'educationArray': [{}],
//       'academicQualifications': [{}],
//       'professionalQualifications': [{}],
//       'prizes': [{}],
//       'scholarships': [{}],
//       'honours': [{}],
//       'nationalRecommendations': [{}],
//       'internationalRecommendations': [{}]
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
    
//     'info': [{}]
//   };
// }

  model = {
    'masterFormGroupings': {
      'workExperience': [
        { organization: '', postHeld: '', duties: '', fromDate: '', toDate: '' }],

      'otherWorkExperience': [{ organization: '', postHeld: '', duties: '', fromDate: '', toDate: '' }],

      'schoolworkexp': [{
        courseCode: '',
        creditHours: '',
        numOfLecturers: '',
        numberOfRegStd: '',
        contribution: '',
        session: '',
        school: '',
        level: ''
      }],

      'courseDescriptions': [{ courseCode: '', courseTitle: '' }],

      'conferencesAttended': [{ confPapR: '' }],

      'papersRead': [{ paper: '', used: '' }],

      'refrees': [{ refreeFullName: '', occupation: '', phoneNumber: '', address: '', email: '' }],

      'membershipOfProfessionalBodies': [{ postHeld: '', organization: '', no: '' }],

      'specialAssignmentATE': [{ postHeld: '', organization: '', fromDate: '', toDate: '' }],

      'specialAssignmentMC': [{ postHeld: '', organization: '', fromDate: '', toDate: '' }],

      'specialAssignmentCS': [{ postHeld: '', communityServiceDescription: '', fromDate: '', toDate: '' }],

      'trainingProgramme': [{ training: '', description: '' }],

      'fellowship': [{ post: '', fellowship: '', date: '' }],

      'supervisionPost': [{
        title: '',
        nameOfStudent: '',
        _d1: '',
        _d2: '',
        soleColla: '',
        degree: ''
      }],

      'supervisionPostPart': [{
        title: '',
        nameOfStudent: '',
        _d1: '',
        _d2: '',
        soleColla: '',
        degree: ''
      }],

      'extraCurriculaActivities': [{ activity : '' }],

      'dateAndSignature': { 'base64Image': '', 'signature': '', 'dateSigned': '' },

      'paperReviewing': [{ paperR: '' }],

      'commendation': [{
        by: '',
        commendationFor: '',
        commendationDate: '',
      }],

      'researchInterests': [{ interest: '' }],

      'commissionedProject': [{ commissionedProject: '' }],

      'publications': {
        'artInP': [{
          pubName: '',
          title: '',
          coAuthors: '',
          publisher: '',
          sn: '',
          g8Country: '',
          volume: '',
          availableAt: '',
          lf: '',
          journalA: '',
          authorship: '',
          used: '',
        }],
        'articlesAcc': [{
          pubName: '',
          title: '',
          publisher: '',
          sn: '',
          availableAt: '',
          used: '',
          lf: '',
          journalAc: '',
        }],
        'books': [{
          book: '',
          used: '',
          bookDetails: '',
          authorship: '',
        }],
        'bookArticlesOrChapter': [{
          bookArtChapt: '',
          used: '',
          bookArtChaptDetails: '',
          authorship: '',
        }],
        'editedConf': [{
          pubName: '',
          title: '',
          publisher: '',
          sn: '',
          availableAt: '',
          used: '',
          lf: '',
          editCP: '',
          authorship: '',
        }],
        'researchInProgress': [{ researchInProgress: '' }],
        'technicalReport': [{
          report: '',
          technicalReportDetails: '',
        }],
        'thesisDissPro': [{ thesis: '' }],
        'papers': [{ paper: '', used: '' }]
      },
    },

    'eaphni': {
      'educationArray': [{
        schoolAttended: '',
        // degree: '',
        fromDate: '',
        toDate: '',

      }],
      'academicQualifications': [{ title: '', degree : '' , date: '' }],
      'professionalQualifications': [{ receivedFrom: '', date: '' }],
      'prizes': [{ receivedFrom: '', title: '', date: '' }],
      'scholarships': [{ receivedFrom: '', title: '', date: '' }],
      'honours': [{ receivedFrom: '', title: '', date: '' }],
      'nationalRecommendations': [{ receivedFrom: '', title: '', date: '' }],
      'internationalRecommendations': [{ receivedFrom: '', title: '', date: '' }]
    },
    'personalInformation': {
      'nameInFull': '',
      'dob': '',
      'placeOfBirth': '',
      'age': '', 'sex': '',
      'maritalStatus': '',
      'nationality': '',
      'town': '',
      'townAndStateOfOrigin': '',
      'lga': '',
      'phoneNumbers': [{ 'phoneNumber': '' }],
      'emailAddresses': [{ 'emailAddress': '' }],
      'contactAddresses': [{ 'contactAddress': '' }],
      'presentEmployer': '',
      'presentPostAndSalary': '',
      'postOnPromotion': '',
    },

    'info': [{}]
  }
}