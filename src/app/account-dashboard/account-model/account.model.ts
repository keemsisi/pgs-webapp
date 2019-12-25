import { DataObjectModel } from 'src/app/models/object.model';

export class info {
         accountUsername : string ;
         accountPassword: string ;
    
}

export class NewPasswordModel {
    newPassword : string ;
    oldPassword : string ;
}


export class CurriculumVitaeModel {
    cvModel : Object ;
}

export class DashModelModel {
    currentRank : string 
    newRankApplied : string
    cvNoUpdated : string ;
    accountActivated : string ;
    dateRegistered : string ;
    lastLogin : string ;
}