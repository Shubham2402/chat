import { Injectable } from '@angular/core';
import {AlertType} from './../enums/alert-type.enum';
import {User } from '../classes/user';
import {Router} from '@angular/router';
import {Observable, from} from 'rxjs';
import {AlertService} from './../services/alert.service';
import { of } from 'rxjs';;
import { switchMap } from 'rxjs/operators';
import { Alert } from '../classes/alert';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser : Observable<User | null>;
  constructor(
    private router: Router,
    private alertService: AlertService,
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    
  ) { 
    this.currentUser= this.afAuth.authState.pipe(switchMap((user) => {
      if(user){
        return this.db.doc<User>(`users/${user.uid}`).valueChanges();
      }else{
        return of(null);
      }
    }))
  }
  public signup(firstName: string,lastName: string,email: string,password: string):Observable<boolean>{
    return from(
      this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      .then((user)=>{
        const userRef:AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
        const updatedUser={
          id:user.user.uid,
          email: user.user.email,
          firstName,
          lastName
        }
        return true;
      })
    );
  }
  public login(email: string,password:string):Observable<boolean>{
    //TODO call firebase login function
    return of(true)
  }
  public logout():void{
    //TODO call firebase logout function
    this.router.navigate(['/login'])
    this.alertService.alerts.next(new Alert('You have been logout.'))
  }
}
