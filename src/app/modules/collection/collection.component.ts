import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { DestroyService } from 'src/app/services/destroyer.service';
import { GiphyService } from 'src/app/services/giphy.service';
import { Gif } from '../gif/gif';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
  providers: [DestroyService]
})
export class CollectionComponent implements OnInit {
  items: Gif[];

  constructor(private readonly destroyer: DestroyService, private service: GiphyService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service
      .getCollection()
      .pipe(takeUntil(this.destroyer))
      .subscribe(({ results }: any) => {
        this.items = results.map((val: any) => new Gif(val, 'create_datetime'));
      });
  }
}
