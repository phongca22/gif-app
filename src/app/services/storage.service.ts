import { Injectable } from '@angular/core';
import { filter } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  ids: string[] = [];
  constructor() {}

  init() {
    const temp = sessionStorage.getItem('favorite');
    if (temp) {
      this.ids = temp.split(',');
    } else {
      this.ids = [];
    }
  }

  addFavorite(id: string) {
    this.ids.push(id);
    this.update();
  }

  removeFavorite(id: string) {
    this.ids = filter(this.ids, (key: string) => key !== id);
    this.update();
  }

  isFavorite(id: string): boolean {
    return this.ids.includes(id);
  }

  private update() {
    sessionStorage.setItem('favorite', this.ids.join(','));
  }
}
