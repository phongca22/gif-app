import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {
  constructor(private http: HttpClient) {}

  upload(file: File, tags: string[]): Observable<any> {
    const form = new FormData();
    form.append('file', file);
    form.append('username', environment.username);
    form.append('tags', tags.join(','));
    return this.http.post('v2/upload', form);
  }

  getDataByTrending(offset: number, limit: number): Observable<any> {
    return this.http.get('v1/gifs/trending', {
      params: {
        offset: offset,
        limit: limit
      }
    });
  }

  getTags(key: string): Observable<any> {
    return this.http.get('v1/gifs/search/tags', {
      params: {
        q: key
      }
    });
  }

  search(tag: string, offset: number, limit: number): Observable<any> {
    return this.http.get('v1/gifs/search', {
      params: {
        q: tag,
        limit: limit,
        offset: offset
      }
    });
  }

  getById(id: string): Observable<any> {
    return this.http.get(`v1/gifs/${id}`);
  }

  getCollection(): Observable<any> {
    return this.http.get(`v4/channels/${environment.channelId}/feed/`);
  }

  getByIds(ids: string): Observable<any> {
    return this.http.get('v1/gifs', {
      params: {
        ids: ids
      }
    });
  }
}
