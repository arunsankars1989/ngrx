import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: [ './add-post.component.scss' ]
})
export class AddPostComponent implements OnInit {

  postForm: FormGroup = new FormGroup({});

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

  onAddPost() {
    if (!this.postForm.valid) {
      return;
    }
    console.log(this.postForm.value);
  }

}
