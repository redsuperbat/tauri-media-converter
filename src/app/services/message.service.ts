import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Message {
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  public messages = new Subject<Message>();
  constructor() {}
}
