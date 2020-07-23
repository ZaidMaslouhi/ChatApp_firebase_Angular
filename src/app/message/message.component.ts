import { chatMessage } from './../models/chat-message.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: chatMessage;
  userName: string;
  userEmail: string;
  messageContent: string;
  timeStamp: Date;
  isOwnMessage: boolean;

  constructor() {
   }

  ngOnInit() {
    this.userName = this.chatMessage.userName;
    this.userEmail = this.chatMessage.email;
    this.messageContent = this.chatMessage.message;
    this.timeStamp = new Date(this.chatMessage.timeSent);
  }

}
