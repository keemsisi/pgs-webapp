import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class CacheService {
  SpNo: string ;
  password: string ;
  loggedIn: boolean;
  registered: boolean ;
  // serverURL = 'http://localhost:8081';
  serverURL: 'https://promotbotformserver.herokuapp.com';
  payloadData: string ;

  constructor() { }
}
