import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Blog } from '@shared/models/blog.model';
import  * as BlogActions  from '@shared/state/actions/blog.actions';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { toSignal } from '@angular/core/rxjs-interop';
import { User } from '@shared/models/user.model';
import { selectCurrentUser } from '@shared/state/selectors/auth.selectors';
import { ActivatedRoute } from '@angular/router';
import { selectBlogById } from '@shared/state/selectors/blog.selectors';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blog-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.scss'
})
export class BlogFormComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);

  blogId: number | null = null;
  isEditMode = false;
  currentBlog: Blog | null = null;
  user = toSignal(this.store.select(selectCurrentUser), { initialValue: null as User | null });
  blogForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
    author: [this.user()?.email || '', [Validators.required]]
  });

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const blogId: string | null = params.get('id');
      if (!blogId) return;
      this.blogId = +blogId;
      this.isEditMode = true;
      this.loadBlogData();
    });
  }

  onSubmit(): void {
    if (this.blogForm.valid) {
      const blog: Blog = { ...this.blogForm.value };
      if (this.isEditMode && this.currentBlog) {
        this.store.dispatch(BlogActions.updateBlog({ blog: { ...this.currentBlog, ...blog } }));
      } else {
        this.store.dispatch(BlogActions.createBlog({ blog }));
      }
    }
  }

  loadBlogData(): void {
    this.store.select(selectBlogById(this.blogId!)).subscribe((blog) => {
      if (!blog) return;
      this.currentBlog = blog;
      this.blogForm.patchValue({
        title: blog.title,
        content: blog.content,
        author: blog.author,
      });
    });
  }
}
