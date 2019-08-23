import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms'
import { Alert } from './../../classes/alert';
import { AlertType } from './../../enums/alert-type.enum';
import {AlertService} from './../../services/alert.service'
import { LoadingService } from 'src/app/services/loading.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  public loginForm: FormGroup;
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
     this.loginForm=this.fb.group({
       email:['',[Validators.required,Validators.email]],
       password:['',[Validators.required,Validators.minLength(8)]]
     })
  }
  //password should not come while inspecting?
  public submit():void{
    this.loadingService.isLoading.next(true);
    if(this.loginForm.valid){
      const {email,password}=this.loginForm.value;
      //TODO call the auth service.
      this.subscriptions.push(
        this.auth.login(email,password).subscribe(success=>{
          if(success){
            this.router.navigateByUrl(this.returnUrl);
          }
            this.loadingService.isLoading.next(false)
        })
      );
    }else{
      const failedLoginAlert = new Alert('Your email or password were invalid , try again.',AlertType.Danger);
      this.loadingService.isLoading.next(false);
      this.alertService.alerts.next(failedLoginAlert)
    }
  }
  ngOnDestroy(){

  }
}
