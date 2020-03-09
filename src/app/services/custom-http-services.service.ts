import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpServicesService {
  // serverURL = 'http://localhost:8081';
  serverURL = 'https://promotbotformserver.herokuapp.com';

  constructor(private clientHttpRequest: HttpClient , private cacheService: CacheService) {

   }

   public sendApplicantInformation(spNumber : string , data: Object): Observable <any> {
     return this.clientHttpRequest.post(this.serverURL + `/applicants/submit-cv/${spNumber}`,
      data, {responseType : 'text'});
   }

   public sendFiles(data: Object): Observable <any> {
     console.log(JSON.stringify(data['data']));
    return this.clientHttpRequest.post(this.serverURL + '/upload/' + data['url'],
     data['data'], {responseType : 'json'});
  }


  public removeFiles(data: Object): Observable <any> {
    return this.clientHttpRequest.post(this.serverURL + '/upload/' + data['url'],
     data['data'], {responseType : 'text'});
  }

  /**
   * 
   * @param spNumber
   */
  public checkspNumber(value): Observable <any> {
    return this.clientHttpRequest.post(this.serverURL + '/users/spNumber/exists', { 'spNumber' : value }, {responseType : 'json'});
  }


  /**
   * 
   * @param email 
   */
  public checkEmail(value): Observable <any> {
    return this.clientHttpRequest.post(this.serverURL + '/users/email/exists', { 'email' : value }, {responseType : 'json'});
  }




  /**
   * 
   * @param spNumber 
   * @param data 
   */
  public registerNewUser(data: Object): Observable <any> {
    return this.clientHttpRequest.post(this.serverURL + `/users/create-account`,
     data, {responseType : 'text'});
  }

  /** 
   * 
   * @param spNumber
   */
  public grantUserLogin(spNumber , password): Observable <any> {
    return this.clientHttpRequest.post(this.serverURL + '/users/grant',
    { 'spNumber' : spNumber, 'password': password }, {responseType : 'json'});
  }

    /**
   * 
   * @param spNumber The usename of the user
   */
  getUserInformation(spNumber): Observable<any> {
    return this.clientHttpRequest.get(`${this.serverURL}` + '/applicants/byspNumber/'  + spNumber, {responseType: 'json'});
  }


  /**
   * 
   * @param spNumber The usename of the user
   */
  sendPasswordResetLink(email): Observable<any> {
    return this.clientHttpRequest.get(`${this.serverURL}` + '/users/'  + email, {responseType: 'json'});
  }


  /**
   *
   * @param spNumber The usename of the user
   */
  submitSurvey(survey): Observable<any> {

    return this.clientHttpRequest.post(`${this.serverURL}` + '/survey/add' , {'survey' : survey } , {responseType: 'json'} );
    
  }


  /**
   * 
   * @param spNumber The usename of the user
   */
  gradeUserCV(spNumber : string ): Observable<any> {
    return this.clientHttpRequest.post(`${this.serverURL}` + `/grader/grade/${spNumber}`, {responseType: 'json'});
  }


    /**
   * 
   * @param spNumber The usename of the user
   */
  loadUserGradedCV(spNumber : string ): Observable<any> {
    return this.clientHttpRequest.get(`${this.serverURL}` + `/grader/load/${spNumber}`  + spNumber, {responseType: 'json'});
  }


  /**
   * 
   * @param spNumber The usename of the user
   */
  clearUserGradedCV(spNumber : string ): Observable<any> {
    return this.clientHttpRequest.get(`${this.serverURL}` + `/grader/clear/${spNumber}`  + spNumber, {responseType: 'json'});
  }

}

/**
 * 
 * checkEmailNotTaken(email: string) {
    return this.http
      .get('assets/users.json')
      .delay(1000)
      .map(res => res.json())
      .map(users => users.filter(user => user.email === email))
      .map(users => !users.length);
  }
 */
