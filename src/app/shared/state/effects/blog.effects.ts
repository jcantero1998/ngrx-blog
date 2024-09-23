import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as BlogActions from '../actions/blog.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { BlogService } from '@shared/services/blog.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable()
export class BlogEffects {

  private actions$ = inject(Actions);
  private blogService = inject(BlogService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);

  loadBlogs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.loadBlogs),
      mergeMap(() =>
        this.blogService.getAllBlogs().pipe(
          map(blogs => BlogActions.loadBlogsSuccess({ blogs })),
          catchError(error => of(BlogActions.loadBlogsFailure({ error })))
        )
      )
    )
  );

  createBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.createBlog),
      mergeMap(action =>
        this.blogService.createBlog(action.blog).pipe(
          map(blog => BlogActions.createBlogSuccess({ blog })),
          catchError(error => of(BlogActions.createBlogFailure({ error })))
        )
      )
    )
  );

  updateBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.updateBlog),
      mergeMap(action =>
        this.blogService.updateBlog(action.blog).pipe(
          map(blog => BlogActions.updateBlogSuccess({ blog })),
          catchError(error => of(BlogActions.updateBlogFailure({ error })))
        )
      )
    )
  );

  deleteBlog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.deleteBlog),
      mergeMap(action =>
        this.blogService.deleteBlog(action.blogId).pipe(
          map(() => BlogActions.deleteBlogSuccess({ blogId: action.blogId })),
          catchError(error => of(BlogActions.deleteBlogFailure({ error })))
        )
      )
    )
  );

  createBlogSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.createBlogSuccess),
      tap(() => {
        this.router.navigate(['']);
        this.snackBar.open('Blog created successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
        });
      })
    ),
    { dispatch: false }
  );

  updateBlogSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.updateBlogSuccess),
      tap(() => {
        this.router.navigate(['']);
        this.snackBar.open('Blog updated successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
        });
      })
    ),
    { dispatch: false }
  );

  deleteBlogSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BlogActions.deleteBlogSuccess),
      tap(() => {
        this.snackBar.open('Blog deleted successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
        });
      })
    ),
    { dispatch: false }
  );

}
