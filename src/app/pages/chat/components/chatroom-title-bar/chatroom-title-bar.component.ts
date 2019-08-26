import { Component, OnInit, Input } from '@angular/core';
import { __importDefault } from 'tslib';

@Component({
  selector: 'app-chatroom-title-bar',
  templateUrl: './chatroom-title-bar.component.html',
  styleUrls: ['./chatroom-title-bar.component.scss']
})
export class ChatroomTitleBarComponent implements OnInit {
  @Input() title:string;
  constructor() { }

  ngOnInit() {
  }

}
