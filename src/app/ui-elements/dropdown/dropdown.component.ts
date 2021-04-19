import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { serialUnsubscriber, SubscriptionCollection } from 'src/app/utils';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent<T> implements OnInit, OnDestroy {
  private subs: SubscriptionCollection = {};

  public onCloseClick$ = new Subject<void>();
  public onDropdownClick$ = new Subject<MouseEvent>();
  public isVisible$ = new BehaviorSubject(false);
  public onDropdownItemClick$ = new Subject<T>();
  public selectedDropdownItemName$: Observable<string>;

  @ViewChild('dropdownItems')
  private dropdownItems: ElementRef;
  @ViewChild('dropdownButton')
  private dropdownButton: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (
        e.target !== this.dropdownItems?.nativeElement &&
        e.target !== this.dropdownButton?.nativeElement
      ) {
        this.isVisible$.next(false);
      }
    });

    this.subs.dropdownClick = this.onDropdownClick$.subscribe(() => {
      this.isVisible$.next(!this.isVisible$.value);
    });
    this.subs.dropdownItemClick = this.onDropdownItemClick$.subscribe(
      (item: T) => {
        this.isVisible$.next(false);
        this.onSelect.emit(item);
      }
    );
    this.subs.closeClick = this.onCloseClick$.subscribe(() =>
      this.onDropdownItemClick$.next(undefined)
    );

    this.selectedDropdownItemName$ = this.onDropdownItemClick$.pipe(
      map((item) => {
        if (item === null || item === undefined) return this.initalText;
        if (this.labelField) return String(item[this.labelField]);
        return String(item);
      }),
      startWith(this.initalText)
    );
  }

  ngOnDestroy(): void {
    serialUnsubscriber(this.subs);
  }
  @Input()
  public items: T[];

  @Input()
  public initalText: string = '';

  @Output()
  public onSelect: EventEmitter<T> = new EventEmitter();

  @Input()
  public labelField?: keyof T | undefined;
}
