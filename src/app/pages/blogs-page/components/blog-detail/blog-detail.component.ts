import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Blog } from '@shared/models/blog.model';
import { selectBlogById } from '@shared/state/selectors/blog.selectors';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  currentBlog: Blog | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const blogId: string | null = params.get('id');
      if (blogId) this.loadBlogData(+blogId);
    });
  }

  loadBlogData(blogId: number): void {
    this.store.select(selectBlogById(blogId)).subscribe((blog) => {
      if (!blog) return;
      this.currentBlog = blog;
    });
  }

}
