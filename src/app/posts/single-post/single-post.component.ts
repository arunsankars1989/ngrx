import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/posts.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: [ './single-post.component.scss' ]
})
export class SinglePostComponent implements OnInit {

  post: Observable<Post | null | undefined> = new Observable<Post>();

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.post = this.store.select(getPostById);
  }

}
