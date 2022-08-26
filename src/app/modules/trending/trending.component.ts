import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { DestroyService } from '../../services/destroyer.service';
import { Gif } from '../gif/gif';
import { TrendingService } from './trending.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss'],
  providers: [DestroyService]
})
export class TrendingComponent implements OnInit {
  items: Gif[] = [];
  total: number = 0;
  offset: number = 0;
  limit: number = 10;
  showLoader: boolean = true;

  constructor(private service: TrendingService, private readonly destroyer: DestroyService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  search(data: string) {
    this.router.navigate(['search', data]);
  }

  getData() {
    this.service
      .getData(this.offset, this.limit)
      .pipe(
        tap(() => (this.showLoader = false)),
        takeUntil(this.destroyer)
      )
      .subscribe(({ data, pagination }: any) => {
        this.total = pagination.total_count;
        this.items = [...this.items, ...data.map((val: any) => new Gif(val))];
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
