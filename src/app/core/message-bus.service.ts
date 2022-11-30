import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum MessageType {
  Success,
  Error
}

export interface Message {
    text: string,
    type: MessageType
}

@Injectable({
  providedIn: 'root'
})


export class MessageBusService {

  private messageQueue$ = new Subject<Message>();

  onNewMessage$ = this.messageQueue$.asObservable();

  constructor() { }

  notifyForMessage(message: Message) {
    this.messageQueue$.next(message);
  }

  clear(): void {
    this.messageQueue$.next(undefined);
  }
}
