import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginCacheService {
  spNumber : string ;
  password : string ;
  loggedIn = false ;
  constructor() {
    this.password = '' ;
    this.spNumber = '';
   }
}
