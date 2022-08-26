import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { isString } from 'lodash';
import { debounce, switchMap, takeUntil, tap, timer } from 'rxjs';
import { DestroyService } from 'src/app/services/destroyer.service';
import { SearchBarService } from './search-bar.service';
import { Tag } from './tag';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  providers: [DestroyService]
})
export class SearchBarComponent implements OnInit {
  @Input() data: string = '';
  @Output() keyChanged: EventEmitter<string> = new EventEmitter();
  items: Tag[] = [];
  keyCtrl: FormControl = new FormControl();

  constructor(private readonly destroyer: DestroyService, private service: SearchBarService) {}

  ngOnInit(): void {
    this.keyCtrl.valueChanges
      .pipe(
        tap(() => (this.items = [])),
        debounce(() => timer(500)),
        switchMap((key: string) => {
          return this.service.query(key);
        }),
        takeUntil(this.destroyer)
      )
      .subscribe(({ data }: any) => {
        this.items = data;
      });

    if (this.data) {
      this.keyCtrl.setValue(this.data);
      this.keyChanged.emit(this.data);
    }
  }

  displayWith(item?: Tag | string): string {
    if (isString(item)) {
      return item;
    } else {
      return item?.name || '';
    }
  }

  select(event: MatAutocompleteSelectedEvent) {
    this.keyChanged.emit(event.option.value.name);
  }
}
