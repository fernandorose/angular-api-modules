import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { PostsService } from '../posts.service';

@Injectable({
  providedIn: 'root',
})
export class PostProviderService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  post$ = this.postsSubject.asObservable();
  private storageKey = 'posts';
  private postsService = inject(PostsService);

  init() {
    const local = localStorage.getItem(this.storageKey);
    if (local) {
      this.postsSubject.next(JSON.parse(local));
    } else {
      this.postsService.getAllPosts().subscribe((posts) => {
        this.postsSubject.next(posts);
        localStorage.setItem(this.storageKey, JSON.stringify(posts));
      });
    }
  }

  setPosts(posts: Post[]) {
    this.postsSubject.next(posts);
    localStorage.setItem(this.storageKey, JSON.stringify(posts));
  }
}
