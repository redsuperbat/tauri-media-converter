import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Message, MessageService } from 'src/app/services/message.service';
import { serialUnsubscriber, SubscriptionCollection } from 'src/app/utils';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit, OnDestroy {
  constructor(private messageService: MessageService) {}

  public message$: Subject<Message | undefined> = new Subject();
  private subs: SubscriptionCollection = {};
  private timeout: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.subs.onMessage = this.messageService.messages.subscribe((message) => {
      clearTimeout(this.timeout);
      this.message$.next(message);
      this.timeout = setTimeout(() => this.handleClose(), 5000);
    });
  }

  public handleClose() {
    this.message$.next(undefined);
    clearTimeout(this.timeout);
  }

  ngOnDestroy(): void {
    serialUnsubscriber(this.subs);
  }
}
