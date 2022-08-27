import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { DestroyService } from 'src/app/services/destroyer.service';
import { GiphyService } from 'src/app/services/giphy.service';
import { Gif } from '../gif/gif';

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
    private service: GiphyService,
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
