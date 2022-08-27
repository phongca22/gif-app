import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DestroyService } from 'src/app/services/destroyer.service';
import { Gif } from '../gif/gif';
import { GifInfoService } from './gif-info.service';

@Component({
  selector: 'app-gif-info',
  templateUrl: './gif-info.component.html',
  styleUrls: ['./gif-info.component.scss'],
  providers: [DestroyService]
})
export class GifInfoComponent implements OnInit {
  id: string;
  item: Gif;
  imageUrl: string;

  constructor(
    private route: ActivatedRoute,
    private service: GifInfoService,
    private readonly destroyer: DestroyService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.service
      .getById(this.id)
      .pipe(takeUntil(this.destroyer))
      .subscribe(({ data }: any) => {
        this.item = new Gif(data, 'import_datetime');
        this.loadImage();
      });
  }

  loadImage() {
    const img = new Image();
    img.onload = () => {
      this.imageUrl = this.item.image.original;
    };

    img.src = this.item.image.original;
  }
}
