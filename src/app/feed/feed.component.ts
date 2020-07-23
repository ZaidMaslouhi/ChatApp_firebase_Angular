import { ChatService } from './../services/chat.service';
import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {

  feed;

  constructor(private chatS:ChatService) { }

  ngOnInit() {
    this.feed = this.chatS.getMessages().valueChanges();
  }

  ngOnChanges() {
    this.feed = this.chatS.getMessages().valueChanges();
  }

}
