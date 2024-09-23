import { Component, inject, OnInit } from '@angular/core';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllBlogs } from '@shared/state/selectors/blog.selectors';
import { Blog } from '@shared/models/blog.model';
import * as BlogActions from '@shared/state/actions/blog.actions';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '@shared/models/user.model';
import { selectCurrentUser } from '@shared/state/selectors/auth.selectors';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,MatIconModule, AsyncPipe, SlicePipe, MatTooltipModule],
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  private store = inject(Store);
  readonly dialog = inject(MatDialog);
  private router = inject(Router);

  blogs$: Observable<Blog[]> = this.store.pipe(select(selectAllBlogs));
  user = toSignal(this.store.select(selectCurrentUser), { initialValue: null as User | null });

  ngOnInit(): void {
    this.store.dispatch(BlogActions.loadBlogs());
  }

  deleteBlog(blog: Blog): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(BlogActions.deleteBlog({ blogId: blog.id }));
      }
    });
  }

  editBlog(blog: Blog): void {
    this.router.navigate(['/edit', blog.id]);
  }

  readMore(blogId: number): void {
    this.router.navigate(['/details', blogId]);
  }

}
