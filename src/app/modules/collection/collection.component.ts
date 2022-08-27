import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { DestroyService } from 'src/app/services/destroyer.service';
import { Gif } from '../gif/gif';
import { CollectionService } from './collection.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  providers: [DestroyService]
})
export class CollectionComponent implements OnInit {
  items: Gif[] = [];

  constructor(private readonly destroyer: DestroyService, private service: CollectionService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service
      .getData()
      .pipe(takeUntil(this.destroyer))
      .subscribe(({ results }: any) => {
        this.items = results.map((val: any) => new Gif(val, 'create_datetime'));
      });
  }
}
