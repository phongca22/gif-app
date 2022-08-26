import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) {}

  upload(file: File, tags: string[]): Observable<any> {
    const form = new FormData();
    form.append('file', file);
    form.append('username', environment.username);
    form.append('tags', tags.join(','));
    return this.http.post('v2/upload', form);
  }
}
