import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BossService {

  constructor(private http: HttpClient) { }

  getBosses(): Observable<any> {
    return this.http.get('https://eldenring.fanapis.com/api/bosses');
  }
}
