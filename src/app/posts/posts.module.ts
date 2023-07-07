import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsRoutingModule } from './posts-routing.module';
import { PostsListComponent } from './posts-list/posts-list.component';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postsReducer } from './state/posts.reducer';
import { POST_STATE_NAME } from './state/posts.selector';
import { TranslateModule } from '@ngx-translate/core';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './state/posts.effects';

@NgModule({
  declarations: [
    PostsListComponent,
    AddPostComponent,
    EditPostComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(POST_STATE_NAME, postsReducer),
    EffectsModule.forFeature([ PostsEffects ]),
    TranslateModule
  ]
})
export class PostsModule {

}
