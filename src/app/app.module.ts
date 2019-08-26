import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import {ReactiveFormsModule} from '@angular/forms'
import {FormsModule} from '@angular/forms';

//Modules
import { AlertModule } from 'ngx-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

//Guards
import {AuthGuard} from './guards/auth.guard'

//services
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { AuthService } from './services/auth.service';
import { ChatroomService } from './services/chatroom.service';

//components
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ChatComponent } from './pages/chat/chat.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ChatInputComponent } from './pages/chat/components/chat-input/chat-input.component';
import { ChatroomListComponent } from './pages/chat/components/chatroom-list/chatroom-list.component';
import { ChatroomTitleBarComponent } from './pages/chat/components/chatroom-title-bar/chatroom-title-bar.component';
import { ChatroomWindowComponent } from './pages/chat/components/chatroom-window/chatroom-window.component';
import { ChatMessageComponent } from './pages/chat/components/chat-message/chat-message.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ChatComponent,
    NavbarComponent,
    ChatInputComponent,
    ChatroomListComponent,
    ChatroomTitleBarComponent,
    ChatroomWindowComponent,
    ChatMessageComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxLoadingModule.forRoot({}),
    AlertModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    AlertService,
    LoadingService,
    AuthService,
    AuthGuard,
    ChatroomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
