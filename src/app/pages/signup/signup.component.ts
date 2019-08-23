import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Alert } from './../../classes/alert';
import { AlertType } from './../../enums/alert-type.enum';
import {AlertService} from './../../services/alert.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit,OnDestroy {
  public signupForm: FormGroup;
  private subscriptions:Subscription[]=[];
  private returnUrl:string;
  constructor(
    private fb:FormBuilder,
    private alertService:AlertService,
    public loadingService :LoadingService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.createForm();
  }
  ngOnInit() {
    this.returnUrl=this.route.snapshot.queryParams[''] || '/chat';
  }
  private createForm():void{
     this.signupForm=this.fb.group({
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]]
     })
  }
  //password should not come while inspecting??
  public submit():void{
    this.loadingService.isLoading.next(true);
    if(this.signupForm.valid){
      const {firstName,lastName,email,password}=this.signupForm.value;
      //TODO call the auth service.
      this.subscriptions.push(
        this.auth.signup(firstName,lastName,email,password).subscribe(success=>{
          if(success){
            this.router.navigate(['/chat']);
          }
            this.loadingService.isLoading.next(false)
        })
      );
    }else{
      const failedSignupAlert=new Alert('Please enter a valid name,email and password, try again',AlertType.Danger)
      this.loadingService.isLoading.next(false);
      this.alertService.alerts.next(failedSignupAlert)
    }
  }
  ngOnDestroy(){
  }
}
