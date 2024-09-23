import { createAction, props } from '@ngrx/store';
import { Blog } from '@shared/models/blog.model';

export const loadBlogs = createAction('[Blog] Load Blogs');

export const loadBlogsSuccess = createAction(
  '[Blog] Load Blogs Success',
  props<{ blogs: Blog[] }>()
);

export const loadBlogsFailure = createAction(
  '[Blog] Load Blogs Failure',
  props<{ error: string }>()
);

export const createBlog = createAction(
  '[Blog] Create Blog',
  props<{ blog: Blog }>()
);

export const createBlogSuccess = createAction(
  '[Blog] Create Blog Success',
  props<{ blog: Blog }>()
);

export const createBlogFailure = createAction(
  '[Blog] Create Blog Failure',
  props<{ error: string }>()
);

export const updateBlog = createAction(
  '[Blog] Update Blog',
  props<{ blog: Blog }>()
);

export const updateBlogSuccess = createAction(
  '[Blog] Update Blog Success',
  props<{ blog: Blog }>()
);

export const updateBlogFailure = createAction(
  '[Blog] Update Blog Failure',
  props<{ error: string }>()
);

export const deleteBlog = createAction(
  '[Blog] Delete Blog',
  props<{ blogId: number }>()
);

export const deleteBlogSuccess = createAction(
  '[Blog] Delete Blog Success',
  props<{ blogId: number }>()
);

export const deleteBlogFailure = createAction(
  '[Blog] Delete Blog Failure',
  props<{ error: string }>()
);
