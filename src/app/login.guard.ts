import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CacheService } from './services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor (private cacheService : CacheService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(window.localStorage.getItem('loggedIn')  == 'true' ) { // allow the login is the spNumber is verified from the server
      return true ;
    } else { 
       return false;
    }
  }
}
