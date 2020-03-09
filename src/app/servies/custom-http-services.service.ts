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
  serverURL = 'https://promotbotformserver.herokuapp.com';

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
   * @param spNumber
   */
  public checkspNumber(value): Observable <any> {
    return this.clientHttpRequest.post(this.serverURL + '/users/exists', { 'spNumber' : value }, {responseType : 'json'});
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
   * @param email 
   */
  sendPasswordResetLink(email : String): Observable<any> {
    return this.clientHttpRequest.get(`${this.serverURL}` + '/users/forgotpassword/'  + email, {responseType: 'json'});
  }



  /**
   * 
   * @param document 
   */
  resetPassword(document : Object , email : String , token: String ): Observable<any> {
    return this.clientHttpRequest.post(`${this.serverURL}` + `/users/resetpassword/?email=${email}&token=${token}` , document , {responseType: 'json'});
  }



    /**
   * 
   * @param email 
   */
  verifyResetPasswordLink(email : String , token : String ): Observable<any> {
    return this.clientHttpRequest.get(`${this.serverURL}` + '/users/verify-forgot-password-link/'  + token , {responseType: 'json'});
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
  activateAccount(email : String , spNumber : String , token : String): Observable<any> {

    return this.clientHttpRequest.post(`${this.serverURL}` +

     `/users/activate?email=${email}&spNumber=${spNumber}&token=${token}`,

     {} , {responseType: 'json'} );
  }




      /**
   *
   * @param spNumber The usename of the user
   */
  sendAnotherLink(email : String , spNumber : String): Observable<any> {

    return this.clientHttpRequest.post(`${this.serverURL}` +

     `/users/activate/link?email=${email}&spNumber=${spNumber}`,

     {} , {responseType: 'json'} );
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
