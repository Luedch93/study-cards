import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private messages: string[] = [];
  messages$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);

  constructor() { }

  addMessage(message: string): void {
    this.messages.push(message);
    this.messages$.next(this.messages);
  }

}
