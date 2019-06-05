import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl } from '@angular/forms';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpServicesService {
  serverURL = 'http://localhost:8081';

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
   * @param username
   */
  public checkUsername(value): Observable <any> {
    return this.clientHttpRequest.post(this.serverURL + '/users/exists', { 'username' : value }, {responseType : 'json'});
  }


  /**
   * 
   * @param username
   */
  public grantUserLogin(username , password): Observable <any> {
    return this.clientHttpRequest.post(this.serverURL + '/users/grant',
    { 'username' : username, 'password': password }, {responseType : 'json'});
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
