import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  hasPermission: Array<any> = [];
  user: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    //this.authService.getPermissions().subscribe(next => this.hasPermission = next);
    if (this.authService.isAuth()) {
      return true;
    } else {
      this.router.navigate(['v2/home']);
    }
  }
}
