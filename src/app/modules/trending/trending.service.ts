import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {
  constructor(private http: HttpClient) {}

  getData(offset: number, limit: number): Observable<any> {
    return this.http.get('v1/gifs/trending', {
      params: {
        offset: offset,
        limit: limit
      }
    });
  }
}
