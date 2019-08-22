import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatroom-window',
  templateUrl: './chatroom-window.component.html',
  styleUrls: ['./chatroom-window.component.scss']
})
export class ChatroomWindowComponent implements OnInit {

  //TODO replace with firebase data
  public dummyData=[
    {
      message:"kfhkgdagdgksdks",
      createdAt:new Date(),
      sender:{
        firstName: "Shubham",
        lastName: "Kaliyar",
        photoUrl: "https://img.etimg.com/thumb/msid-68333505,width-643,imgsize-204154,resizemode-4/googlechrome.jpg"
      }
    },
    {
      message:"Hello",
      createdAt:new Date(),
      sender:{
        firstName: "Shubham",
        lastName: "Sharma",
        photoUrl: "https://img.etimg.com/thumb/msid-68333505,width-643,imgsize-204154,resizemode-4/googlechrome.jpg"
      }
    },
    {
      message:"kfhkgdqrihfipsfksfsfksfjksdks",
      createdAt:new Date(),
      sender:{
        firstName: "Sudo",
        lastName: "Deewan",
        photoUrl: "https://img.etimg.com/thumb/msid-68333505,width-643,imgsize-204154,resizemode-4/googlechrome.jpg"
      }
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
