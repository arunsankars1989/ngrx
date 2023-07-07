import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { Post } from '../../models/posts.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { updatePost } from '../state/posts.actions';
import { TranslateService } from '@ngx-translate/core';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: [ './edit-post.component.scss' ]
})
export class EditPostComponent implements OnInit, OnDestroy {

  // postForm: FormControl = new FormControl({});
  post: Post = {} as Post;
  postForm: FormGroup = new FormGroup({});
  postSubscription: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private translate: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.postSubscription = this.store
      .select(getPostById)
      .subscribe((post) => {
        if (post) {
          this.post = post as Post;
          this.postForm.patchValue({
            title: post?.title,
            description: post?.description
          });
        }
      });
  }

  showTitleErrors(): string | null {
    let titleReq = '';
    let titleMinLen = '';
    this.translate.get(
      [ 'formErrors.titleReq', 'formErrors.titleMinLen' ],
      { titleLen: 6 }
    ).subscribe(translations => {
      titleReq = translations['formErrors.titleReq'];
      titleMinLen = translations['formErrors.titleMinLen'];
    });
    const titleForm = this.postForm.get('title');
    if (titleForm?.touched && !titleForm.valid) {
      if (titleForm?.errors?.['required']) {
        return titleReq;
      }
      if (titleForm?.errors?.['minlength']) {
        return titleMinLen;
      }
    }
    return null;
  }

  showDescriptionErrors(): string | null {
    let descReq = '';
    let descMinLen = '';
    this.translate.get(
      [ 'formErrors.descriptionReq', 'formErrors.descriptionMinLen' ],
      { descLen: 10 }
    ).subscribe(translations => {
      descReq = translations['formErrors.descriptionReq'];
      descMinLen = translations['formErrors.descriptionMinLen'];
    });
    const descriptionForm = this.postForm.get('description');
    if (descriptionForm?.touched && !descriptionForm.valid) {
      if (descriptionForm?.errors?.['required']) {
        return descReq;
      }
      if (descriptionForm?.errors?.['minlength']) {
        return descMinLen;
      }
    }
    return null;
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      description: new FormControl(null, [
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
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

}
