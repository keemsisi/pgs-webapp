import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginCacheService {
  username : string ;
  password : string ;
  loggedIn = false ;
  constructor() {
    this.password = '' ;
    this.username = '';
   }
}
