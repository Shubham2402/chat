import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ChatroomService } from './../../../../services/chatroom.service';
import { LoadingService } from 'src/app/services/loading.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit,OnDestroy,AfterViewChecked {
  
  @ViewChild('scrollContainer', {static: false}) private scrollContainer: ElementRef;
  private subscriptions: Subscription[] = [];
  public chatroom: Observable<any>;
  public messages: Observable<any>;
  param1: string;
  chatId:any
  subscribedParam: string;
  
  constructor(
    private route: ActivatedRoute,
    private chatroomService: ChatroomService,
    private loadingService: LoadingService,
    public router: Router
  ) { 
    this.subscriptions.push(
      this.chatroomService.selectedChatroom.subscribe(chatroom => {
        this.chatroom = chatroom;
      })
    );
    console.log(chatroomService.selectedChatroomMessages)
    this.subscriptions.push(
      this.chatroomService.selectedChatroomMessages.subscribe(messages =>{
        this.messages = messages;    
      })
    );
    // router.events.subscribe((url:any) => console.log(url));
    //   console.log(router.url);  // to print only path eg:"/login"
    //   var filter = router.url.split('/')
    //   this.chatId = filter[2]
      // this.chatroomService.changeChatroom.next(this.chatId)
  }

  ngOnInit() {
    this.scrollToBottom();
    
    this.subscriptions.push(
      this.route.paramMap.subscribe(params =>{
        // const chatroomId = params.get('chatroomId');
        this.router.events.subscribe((url:any) => console.log(url));
        console.log(this.router.url);  // to print only path eg:"/login"
      var filter = this.router.url.split('/')
      this.chatId = filter[2]
        const chatroomId=this.chatId
        this.chatroomService.changeChatroom.next(chatroomId);
      })
    );
    
  }
  ngAfterViewChecked(){
    this.scrollToBottom();
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  private scrollToBottom(): void{
    try{
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }catch(err){}
  }

}
