import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { Observable, of } from 'rxjs';
import { Post } from '../../models/posts.model';
import { getPosts } from '../state/posts.selector';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: [ './posts-list.component.scss' ]
})
export class PostsListComponent implements OnInit {

  posts: Observable<Post[]> = of();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
  }

}
