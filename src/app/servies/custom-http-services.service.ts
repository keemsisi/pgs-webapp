import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpServicesService {
  // readonly serverURL = 'http://localhost:8081';
  readonly serverURL: 'https://promotbotformserver.herokuapp.com';

  constructor(private clientHttpRequest: HttpClient , private cacheService: CacheService) {

   }

   public sendApplicantInformation(data: Object): Observable <any> {
     return this.clientHttpRequest.post(this.serverURL + '/applicants/register',
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
   * @param SpNo
   */
  public checkSpNo(value): Observable <any> {
    return this.clientHttpRequest.post(this.serverURL + '/users/exists', { 'SpNo' : value }, {responseType : 'json'});
  }


  /**
   * 
   * @param SpNo
   */
  public grantUserLogin(SpNo , password): Observable <any> {
    return this.clientHttpRequest.post(this.serverURL + '/users/grant',
    { 'SpNo' : SpNo, 'password': password }, {responseType : 'json'});
  }

    /**
   * 
   * @param SpNo The usename of the user
   */
  getUserInformation(SpNo): Observable<any> {
    return this.clientHttpRequest.get(`${this.serverURL}` + '/applicants/bySpNo/'  + SpNo, {responseType: 'json'});
  }


  /**
   *
   * @param SpNo The usename of the user
   */
  submitSurvey(survey): Observable<any> {
    return this.clientHttpRequest.post(`${this.serverURL}` + '/survey/add' , {'survey' : survey } , {responseType: 'json'} );
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
