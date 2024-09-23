import { createReducer, on } from '@ngrx/store';
import * as BlogActions from '../actions/blog.actions';
import { Blog } from '@shared/models/blog.model';

export interface BlogState {
  blogs: Blog[];
  error: string | null;
}

export const initialState: BlogState = {
  blogs: [],
  error: null,
};

export const blogReducer = createReducer(
  initialState,
  on(BlogActions.loadBlogsSuccess, (state, { blogs }) => ({
    ...state,
    blogs,
    error: null,
  })),
  on(BlogActions.loadBlogsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(BlogActions.createBlogSuccess, (state, { blog }) => ({
    ...state,
    blogs: [...state.blogs, blog],
    error: null,
  })),
  on(BlogActions.createBlogFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(BlogActions.updateBlogSuccess, (state, { blog }) => ({
    ...state,
    blogs: state.blogs.map(b => (b.id === blog.id ? blog : b)),
    error: null,
  })),
  on(BlogActions.updateBlogFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(BlogActions.deleteBlogSuccess, (state, { blogId }) => ({
    ...state,
    blogs: state.blogs.filter(b => b.id !== blogId),
    error: null,
  })),
  on(BlogActions.deleteBlogFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
