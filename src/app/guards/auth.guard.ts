import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertType } from './../enums/alert-type.enum';
import { Alert } from './../classes/alert';
import { map, take, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private alertService: AlertService
  ){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
      return this.auth.currentUser.pipe(
        take(1),
        map((currentUser) => !!currentUser),
        tap((loggedIn) =>{
          if(!loggedIn){
            this.alertService.alerts.next(new Alert('You must be logged in to access this page.',AlertType.Danger));
            this.router.navigate(['/login'], {queryParams: { returnUrl: state.url}})
          }
        })
      );
  }
}
