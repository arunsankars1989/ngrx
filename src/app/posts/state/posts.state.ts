import { Post } from '../../models/posts.model';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

export interface PostsState extends EntityState<Post> {
  // passing additional values(if any) here
  count: number;
}

export const postsAdapter = createEntityAdapter<Post>({
  // this code is not necessary in the current case as the default key is id.
  // if the key is something other than id, then use this and pass the primary key field here.
  // selectId: (post: Post) => post.id as string
  sortComparer: sortByName
});

export const initialState: PostsState = postsAdapter.getInitialState({
  // initializing the additional values(if any) here
  count: 0
});

export function sortByName(a: Post, b: Post) {
  // ascending order sort
  return a.title.localeCompare(b.title);

  // descending order sort
  /*const compare = a.title.localeCompare(b.title);
  if (compare > 0) {
    return -1;
  } else if (compare < 0) {
    return 1;
  }
  return compare;*/

}
