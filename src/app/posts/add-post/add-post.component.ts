import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/posts.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { addPost } from '../state/posts.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: [ './add-post.component.scss' ]
})
export class AddPostComponent implements OnInit {

  postForm: FormGroup = new FormGroup({});

  constructor(
    private store: Store<AppState>,
    private translate: TranslateService
  ) {
  }

  ngOnInit() {
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

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }

    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description
    };

    this.store.dispatch(addPost({ post }));
  }

}
