import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { Observable } from 'rxjs';
import { Post } from '../../models/posts.model';
import { getCount, getPosts } from '../state/posts.selector';
import { deletePost, loadPosts } from '../state/posts.actions';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: [ './posts-list.component.scss' ]
})
export class PostsListComponent implements OnInit {

  posts: Observable<Post[]> = new Observable<Post[]>();
  count: Observable<number> = new Observable<number>();

  constructor(
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.count = this.store.select(getCount);
    // added to overcome the state changed error. This code will execute after the change detection only
    setTimeout(() => {
      this.store.dispatch(loadPosts());
    }, 0);
  }

  onDeletePost(id: string | undefined) {
    if (confirm('Are you sure you want to delete?')) {
      id ? this.store.dispatch(deletePost({ id })) : '';
    }
  }

}
