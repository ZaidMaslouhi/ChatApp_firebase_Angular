import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent {

  message: string;

  constructor(private chatServ: ChatService) { }

  handleSubmit = (event) => {
    if(event.keyCode === 13)
      this.send();
  }

  send = () => this.chatServ.sendMessage(this.message);
  

}
