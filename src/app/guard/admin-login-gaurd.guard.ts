import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CacheService } from '../servies/cache.service';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginGaurdGuard implements CanActivate {
  constructor(private cache: CacheService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ): Observable<boolean> | Promise<boolean> | boolean {
      if (this.cache.loggedIn) {
            return true;
      } else {
        return false ;
      }
  }
}
