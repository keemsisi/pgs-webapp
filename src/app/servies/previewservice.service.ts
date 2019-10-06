import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreviewserviceService {
  protected static personal: Array<String>  = [
    'NAME IN FULL',
    'DATE OF BIRTH',
    'PLACE OF BIRTH',
    'AGE',
    'SEX',
    'MARITAL STATUS',
    'NATIONALITY',
    'TOWN AND STATE OF ORIGIN',
    'CONTACT ADDRESS',
    'NATIONALITY',
    'PHONE NUMBER',
    'EMAIL ADDRESS',
    'PRESENT POST AND SALARY',
    'POST ON PROMOTION',
  ];


  protected static educationalBackground: Array<String>  = [
    ''
  ];


  constructor() { }
}
