import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
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

  constructor(private storage: StorageService, private cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    if (this.data) {
      this.isFavorite = this.storage.isFavorite(this.data.id);
      this.loadImage();
    } else {
      this.isFavorite = false;
      this.cdr.markForCheck();
    }
  }

  ngOnInit(): void {}

  setFavorite() {
    if (this.isFavorite) {
      this.storage.removeFavorite(this.data!.id);
    } else {
      this.storage.addFavorite(this.data!.id);
    }
    this.isFavorite = !this.isFavorite;
    this.cdr.markForCheck();
  }

  loadImage() {
    const img = new Image();
    img.onload = () => {
      this.imageUrl = this.data?.image.preview;
      this.cdr.markForCheck();
    };

    img.src = this.data!.image.preview;
  }
}
