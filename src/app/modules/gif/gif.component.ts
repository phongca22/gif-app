import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Gif } from './gif';

@Component({
  selector: 'app-gif',
  templateUrl: './gif.component.html',
  styleUrls: ['./gif.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GifComponent implements OnInit, OnChanges {
  @Input() data: Gif;
  @Input() hideFavorite: boolean;
  showPanel: boolean;
  isFavorite: boolean;
  imageUrl: string;

  constructor(private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnChanges(): void {
    if (this.data) {
      this.loadImage();
    } else {
      this.cdr.markForCheck();
    }
  }

  ngOnInit(): void {}

  loadImage() {
    const img = new Image();
    img.onload = () => {
      this.imageUrl = this.data?.image.original;
      this.cdr.markForCheck();
    };

    img.src = this.data!.image.original;
  }

  view() {
    this.router.navigate(['gif-info', this.data.id]);
  }
}
