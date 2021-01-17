import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_URL} from '../environments/environment';
import {Post} from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  // private static _handleError(err: HttpErrorResponse | any): any {
  //   return Observable.throw(err.message || 'Error: Unable to complete request.');
  // }

  getPosts(): Observable<any> {
    console.log(this.http.get<any>(`${API_URL}/deals`));
    return this.http.get<any>(`${API_URL}/deals`);
  }
}
