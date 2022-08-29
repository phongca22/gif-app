import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GiphyService } from 'src/app/services/giphy.service';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  constructor(private storage: StorageService, private service: GiphyService) {}

  getData(): Observable<any> {
    const ids = this.storage.ids;
    if (ids.length === 0) {
      return of({ data: [] });
    } else {
      return this.service.getByIds(ids.join(','));
    }
  }
}
