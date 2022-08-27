import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { Gif } from 'src/app/modules/gif/gif';
import { DestroyService } from 'src/app/services/destroyer.service';
import { GiphyService } from 'src/app/services/giphy.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [DestroyService]
})
export class SearchComponent implements OnInit {
  key: string = '';
  items: Gif[] = [];
  total: number = 0;
  offset: number = 0;
  tag: string;
  limit: number = 10;
  showLoader: boolean = true;

  constructor(
    private service: GiphyService,
    private route: ActivatedRoute,
    private readonly destroyer: DestroyService
  ) {}

  ngOnInit(): void {
    this.key = this.route.snapshot.paramMap.get('key') || '';
  }

  search(data: string) {
    this.offset = 0;
    this.tag = data;
    this.getData();
  }

  getData() {
    this.service
      .search(this.tag, this.offset, this.limit)
      .pipe(
        tap(() => (this.showLoader = false)),
        takeUntil(this.destroyer)
      )
      .subscribe(({ data, pagination }: any) => {
        this.total = pagination.total_count;
        this.items = [...this.items, ...data.map((val: any) => new Gif(val, 'import_datetime'))];
      });
  }

  loadMore() {
    this.offset += this.limit;
    if (this.offset > this.total) {
      return;
    }

    this.showLoader = true;
    this.getData();
  }
}
