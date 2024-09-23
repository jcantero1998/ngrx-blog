import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BlogState } from '../reducers/blog.reducers';

export const selectBlogState = createFeatureSelector<BlogState>('blogs');

export const selectAllBlogs = createSelector(
  selectBlogState,
  (state: BlogState) => state.blogs
);

export const selectBlogById = (blogId: number) =>
  createSelector(selectBlogState, (state: BlogState) =>
    state.blogs.find(blog => blog.id === blogId)
  );

export const selectBlogError = createSelector(
  selectBlogState,
  (state: BlogState) => state.error
);

export const selectBlogsByUser = createSelector(
  selectBlogState,
  (state: BlogState) => state.blogs.filter(blog => blog.author === 'jon@example.com')
);
