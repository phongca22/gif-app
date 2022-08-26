import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private http: HttpClient) {}

  query(tag: string, offset: number, limit: number): Observable<any> {
    return this.http.get('v1/gifs/search', {
      params: {
        q: tag,
        limit: limit,
        offset: offset
      }
    });
  }
}
