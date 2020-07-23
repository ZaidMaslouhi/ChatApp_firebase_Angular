import { ChatService } from './../services/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users;
    constructor(private chatServ:ChatService) { }

  ngOnInit() {
    this.users = this.chatServ.getAllUsers().valueChanges();
  }

}
