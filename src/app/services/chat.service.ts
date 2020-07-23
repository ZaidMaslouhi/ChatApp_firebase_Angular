import { async } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { chatMessage } from './../models/chat-message.model';
import { Injectable, Query, OnInit } from '@angular/core';
import { take, map, timeInterval } from 'rxjs/operators';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  user: firebase.User;
  chatMessages: AngularFireList<chatMessage>;
  chatMessage: chatMessage;
  username: any;

  constructor(private db: AngularFireDatabase,private Auth: AngularFireAuth) {
    if(this.Auth.authState)
      this.Auth.authState.subscribe(us=>{
        if(us) this.user = us;
      });
  }

  getAllUsers = () => this.db.list('/users');

  getCurrentUser = () =>{
    let id = localStorage.getItem('user');
    this.db.object(`/users/${id}`).valueChanges()
    .pipe(take(1)).pipe(map(x=> x=x))
    .subscribe((res:any)=>{ this.username = res});
  }

  sendMessage = async(msg: string) =>{
    try{
      await this.getCurrentUser();
      console.log('IAM USER '); // test
      console.log(this.username); // test
      const timestamp = this.getTimeStamp();
      const email = this.user.email;
      this.chatMessages = this.getMessages();
      this.chatMessages.push({
        email: email,
        userName: this.username.displayName,
        message: msg,
        timeSent: timestamp
      });
    }catch{}
  }

  getMessages = (): AngularFireList<chatMessage> => this.db.list('messages');

  getTimeStamp = ()=> {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
    const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();
    return (date + ' ' + time);
  }

}
