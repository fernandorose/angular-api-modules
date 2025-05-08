import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PostProviderService } from '../../services/providers/post-provider';
import { Post } from '../../interfaces/post.interface';

@Component({
  selector: 'app-posts-page',
  imports: [],
  templateUrl: './posts-page.component.html',
  styleUrl: './posts-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsPageComponent {
  private postProvider = inject(PostProviderService);

  posts: Post[] = [];

  ngOnInit(): void {
    this.postProvider.init();
    this.postProvider.post$.subscribe((data) => (this.posts = data));
  }
}

export default PostsPageComponent;
