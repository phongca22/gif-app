import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifInfoService {
  constructor(private http: HttpClient) {}

  getById(id: string): Observable<any> {
    return this.http.get(`v1/gifs/${id}`);
  }
}
