import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CacheService } from './services/cache.service';

@Injectable({
  providedIn: 'root'
})
export class RegsuccssgaurdGuard implements CanActivate {
  constructor(private customCache : CacheService  , private router : Router)  {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.customCache.registrationSuccessful) { 
      return true;
    }else {
      this.router.navigate(['/']).catch(function(cause){
        console.table(cause);
      })
      return false ;
    }
  }
  
}
