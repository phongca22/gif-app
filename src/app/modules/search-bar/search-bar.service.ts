import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  constructor(private http: HttpClient) {}

  query(key: string): Observable<any> {
    return this.http.get('https://api.giphy.com/v1/gifs/search/tags', {
      params: {
        q: key
      }
    });
  }
}
