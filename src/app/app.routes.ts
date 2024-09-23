import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { BlogsPageComponent } from './pages/blogs-page/blogs-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { BlogFormComponent } from './pages/blogs-page/components/blog-form/blog-form.component';
import { BlogListComponent } from '@pages/blogs-page/components/blog-list/blog-list.component';
import { BlogDetailComponent } from '@pages/blogs-page/components/blog-detail/blog-detail.component';


export const routes: Routes = [
  {
    path: '',
    component: BlogsPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: BlogListComponent,
        data: { title: 'Blogs' },
      },
      {
        path: 'create',
        component: BlogFormComponent,
        canActivate: [AuthGuard],
        data: { title: 'Create Blog' },
      },
      {
        path: 'edit/:id',
        component: BlogFormComponent,
        canActivate: [AuthGuard],
        data: { title: 'Edit Blog' },
      },
      {
        path: 'details/:id',
        component: BlogDetailComponent,
        data: { title: 'Details of Blog' },
      },
    ]
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: 'Login' },
  },
  {
    path: 'register',
    component: LoginPageComponent,
    data: { title: 'Register' },
  },
  { path: '**', redirectTo: '' }
];
