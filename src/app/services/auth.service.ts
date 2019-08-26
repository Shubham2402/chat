import { Injectable } from '@angular/core';
import {AlertType} from './../enums/alert-type.enum';
import {User } from '../interfaces/user';
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
  public currentUserSnapshot : User | null;
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
    this.setCurrentUserSnapshot();
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
          lastName,
          photoUrl:'https://firebasestorage.googleapis.com/v0/b/chat-8dbf0.appspot.com/o/download400*400.jpeg?alt=media&token=5c099ca7-6079-46fa-8ac4-0ecc75f31ec9',
          quote:'Life is like a box',
          bio: 'Bio is under construction...'
        }
        userRef.set(updatedUser);
        return true;
      })
      .catch((err)=>false)
    );
  }
  public login(email: string,password:string):Observable<boolean>{
    return from(
      this.afAuth.auth.signInWithEmailAndPassword(email,password)
      .then((user)=> true)
      .catch((err)=> false)
    )
  }
  public logout():void{
    this.afAuth.auth.signOut().then(()=>{
      this.router.navigate(['/login'])
      this.alertService.alerts.next(new Alert('You have been logout.'))  
    })
  }

  private setCurrentUserSnapshot(): void {
    this.currentUser.subscribe(user => this.currentUserSnapshot =user);
  }
}
