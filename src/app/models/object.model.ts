export class DataObjectModel {
  model: Object = {
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
      'scholarships': [{}],
      'honours': [{}],
      'nationalRecommendations': [{}],
      'internationalRecommendations': [{}]
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
    
    'loginCredentials': [{}]
  };
}