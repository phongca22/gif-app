import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  constructor(private http: HttpClient, private storage: StorageService) {}

  getData(): Observable<any> {
    const ids = this.storage.ids;
    if (ids.length === 0) {
      return of({ data: [] });
    } else {
      return this.http.get('v1/gifs', {
        params: {
          ids: ids.join(',')
        }
      });
    }
  }
}
