import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../data/messages.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss'],
    standalone: false
})
export class MessagesComponent {
  constructor(public messageService: MessagesService) { }
}
