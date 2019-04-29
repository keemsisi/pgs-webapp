import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomHttpServicesService {
  serverURL: 'http://localhost:8081';

  constructor(private clientHttpRequest: HttpClient) {

   }

   public sendApplicantInformation(data: Object): Observable <any> {
     console.log (data);
     const header = new HttpHeaders();
     header.set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
     header.set('Access-Control-Allow-Origin', '*');
     return this.clientHttpRequest.post('http://localhost:8081/applicant/register', data, {responseType : 'text' , headers : header});
   }
}
