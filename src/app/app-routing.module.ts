import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {LoginComponent} from './pages/login/login.component'
import {SignupComponent} from './pages/signup/signup.component'
import { ChatComponent } from './pages/chat/chat.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component'
const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    redirectTo:'/login'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'chat',
    component:ChatComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '',component: ChatComponent},
      { path: ':chatroomId', component: ChatComponent}
    ]
  },
  {
    path:'profile/:userId',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path:'chat/:',
  //   component: ChatComponent
  // },
  // {
  //   path:'chat/:chatroomId',
  //   component: ChatComponent
  // },
  {
    path:'**',
    redirectTo:'/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
