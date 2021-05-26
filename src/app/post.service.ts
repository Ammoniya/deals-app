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

  private res: any;

  getPosts(): Observable<any> {
    console.log('Nadeeja');
    return this.http.get<any>(`${API_URL}/deals`);
  }
}
