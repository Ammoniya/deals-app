import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private res: Observable<any> | undefined;

  constructor(private http: HttpClient) { }

  getPosts(): Observable<any> {
    this.res = this.http.get<any>(`${API_URL}/deals`);
    console.log(this.res);
    return this.res;
  }

  getCount(): Observable<any> {
    this.res = this.http.get<any>(`${API_URL}/count`);
    console.log(this.res);
    return this.res;
  }
}
