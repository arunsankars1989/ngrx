import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Post } from '../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(
      'https://ngrxtest-c171a-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json'
    ).pipe(
      map((data) => {
        const posts: Post[] = [];
        for (const key in data) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          posts.push({ ...data[key], id: key });
        }
        return posts;
      })
    );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      'https://ngrxtest-c171a-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      post
    );
  }

  updatePost(post: Post): Observable<{ name: string }> {
    return this.http.put<{ name: string }>(
      'https://ngrxtest-c171a-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json',
      post
    );
  }

}
