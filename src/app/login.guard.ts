import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginCacheService } from './services/login-cache.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor (private loginCache : LoginCacheService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // if(this.loginCache.loggedIn) { // allow the login is the SpNo is verified from the server
    //   return true ;
    // } else {
    //    return false;
    // }

    return true;
  }
}
