import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { getPostById } from '../state/posts.selector';
import { Post } from '../../models/posts.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { updatePost } from '../state/posts.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: [ './edit-post.component.scss' ]
})
export class EditPostComponent implements OnInit, OnDestroy {

  // postForm: FormControl = new FormControl({});
  post = {} as Post;
  postForm: FormGroup = new FormGroup({});
  postSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id') || '';
      this.postSubscription = this.store
        .select(getPostById(id))
        .subscribe((data) => {
          this.post = data as Post;
          this.createForm();
        });
    });
  }

  showTitleErrors(): string | null {
    const titleForm = this.postForm.get('title');
    if (titleForm?.touched && !titleForm.valid) {
      if (titleForm?.errors?.['required']) {
        return 'Title is required';
      }
      if (titleForm?.errors?.['minlength']) {
        return 'Title should be of minimum 6 characters length';
      }
    }
    return null;
  }

  showDescriptionErrors(): string | null {
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm?.touched && !descriptionForm.valid) {
      if (descriptionForm?.errors?.['required']) {
        return 'Description is required';
      }
      if (descriptionForm?.errors?.['minlength']) {
        return 'Description should be of minimum 10 characters length';
      }
    }
    return null;
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.minLength(6)
      ]),
      description: new FormControl(this.post.description, [
        Validators.required,
        Validators.minLength(10)
      ])
    });
  }

  onSubmit() {
    if (!this.postForm.valid) {
      return;
    }
    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post.id,
      title,
      description
    };

    this.store.dispatch(updatePost({ post }));
    this.router.navigate([ 'posts' ]);
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

}
