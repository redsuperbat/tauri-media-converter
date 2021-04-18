import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent<T> implements OnInit, OnDestroy {
  private subs: Subscription[] = [];
  public onDropdownClick$ = new Subject<MouseEvent>();
  public isVisible$ = new BehaviorSubject(false);
  public onDropdownItemClick$ = new Subject<T>();
  public selectedDropdownItemName$: Observable<string>;

  ngOnInit(): void {
    this.subs.push(
      this.onDropdownClick$.subscribe(() => {
        this.isVisible$.next(!this.isVisible$.value);
      }),
      this.onDropdownItemClick$.subscribe((item: T) => {
        this.isVisible$.next(false);
        this.onSelect?.emit(item);
      })
    );
    this.selectedDropdownItemName$ = this.onDropdownItemClick$.pipe(
      map((item) => {
        if (this.labelField) return String(item[this.labelField]);
        return this.initalText;
      }),
      startWith(this.initalText)
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
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
