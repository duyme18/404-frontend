import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {Permissions} from './permissions';

@Injectable({
  providedIn: 'root'
})
export class IsAdmin implements CanActivate {
  constructor(private permission: Permissions,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.permission.isAdmin()) {
      return this.permission.isAdmin();
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
