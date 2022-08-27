import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Gif } from 'src/app/modules/gif/gif';
import { DestroyService } from 'src/app/services/destroyer.service';
import { FavoriteService } from './favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss'],
  providers: [DestroyService]
})
export class FavoriteComponent implements OnInit {
  items: Gif[] = [];
  constructor(private service: FavoriteService, private router: Router, private readonly destroyer: DestroyService) {}

  ngOnInit(): void {
    this.service
      .getData()
      .pipe(takeUntil(this.destroyer))
      .subscribe(({ data }: any) => {
        this.items = data.map((val: any) => new Gif(val, 'import_datetime'));
      });
  }

  search(data: string) {
    this.router.navigate(['search', data]);
  }
}
