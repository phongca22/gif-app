import { Component, Input, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-gif-favorite',
  templateUrl: './gif-favorite.component.html',
  styleUrls: ['./gif-favorite.component.scss']
})
export class GifFavoriteComponent implements OnInit {
  @Input() data: string;
  @Input() color: string;
  isFavorite: boolean;

  constructor(private storage: StorageService) {}

  ngOnInit(): void {
    this.isFavorite = this.storage.isFavorite(this.data);
  }

  setFavorite() {
    if (this.isFavorite) {
      this.storage.removeFavorite(this.data);
    } else {
      this.storage.addFavorite(this.data);
    }
    this.isFavorite = !this.isFavorite;
  }
}
