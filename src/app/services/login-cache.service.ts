import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginCacheService {
  SpNo : string ;
  password : string ;
  loggedIn = false ;
  constructor() {
    this.password = '' ;
    this.SpNo = '';
   }
}
