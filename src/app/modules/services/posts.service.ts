import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { API_GET_POSTS } from '../../environment';
import { Post } from '../interfaces/post.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private http = inject(HttpClient);

  getAllPosts() {
    return this.http.get<{ posts: Post[] }>(API_GET_POSTS).pipe(
      tap((data) => console.log(data.posts)),
      map((data) => data.posts)
    );
  }
}
