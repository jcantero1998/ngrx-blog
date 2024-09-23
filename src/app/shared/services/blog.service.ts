import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Blog } from '../models/blog.model';
import { select, Store } from '@ngrx/store';
import { selectAllBlogs } from '@shared/state/selectors/blog.selectors';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private blogs: Blog[] = [];
  private store = inject(Store);

  constructor() {
    //TODO: Al no tner una API, Cargamos los blogs del store o creamos un blog de prueba
    this.store.pipe(select(selectAllBlogs)).subscribe(blogs => {
      this.blogs = blogs;
      if (blogs.length === 0) this.createTestBlogs();
    });
  }

  createTestBlogs() {
    const blog = {
      id: 1,
      title: 'First  Post',
      author: 'admin@mail.com',
      content: `Amet tempor eu nulla et qui excepteur excepteur aliquip aute. Aliqua ad irure magna voluptate in occaecat sint pariatur nulla labore cupidatat. Sit culpa aute ad aliqua qui anim. Enim irure anim pariatur aliquip aute ipsum labore occaecat officia elit veniam eiusmod. Dolore mollit ex ullamco excepteur amet aliqua minim labore.
                Sint pariatur magna sit irure exercitation veniam nisi duis consectetur est ea. Sunt ut in anim occaecat incididunt. Laborum aute mollit irure commodo proident. Ullamco nisi elit anim et aliqua aliqua aliqua qui exercitation irure enim aliqua. Ut irure officia fugiat officia ullamco eu.
                Sint ut labore aliqua laboris culpa. Sunt irure adipisicing do ipsum velit nulla voluptate consectetur voluptate exercitation. Culpa dolor ullamco aliqua voluptate enim eiusmod nisi et. Anim laborum non culpa minim irure consequat consequat veniam commodo excepteur. Voluptate qui adipisicing esse nulla exercitation elit.
                Sit reprehenderit ipsum occaecat veniam duis enim dolore. Sunt sit aliquip aliqua dolore. Qui irure laboris fugiat excepteur elit irure velit duis ea. Amet duis magna dolore ut nisi culpa. Eiusmod id tempor ipsum in elit amet amet minim. Do irure eu incididunt veniam sunt ex quis nulla ut officia quis aliquip culpa est.
                Laborum non quis voluptate esse. Pariatur esse adipisicing cillum nisi ipsum. In aute voluptate anim consectetur cupidatat incididunt ea commodo occaecat ullamco deserunt amet et ullamco.
                Non Lorem tempor aute Lorem aute proident voluptate incididunt laborum et pariatur. Adipisicing minim deserunt duis tempor esse fugiat quis quis consequat nostrud adipisicing amet. Eiusmod nulla anim sunt ex sint enim anim dolore consequat incididunt labore est. Sint laborum commodo est sunt ipsum ullamco ad aliquip minim laborum pariatur. Nulla cillum sint duis tempor id commodo id ea non voluptate culpa. Aliquip dolore voluptate nisi enim non labore laborum nostrud excepteur sit occaecat enim ipsum. Qui veniam pariatur amet ex ipsum labore in id nisi consectetur pariatur velit deserunt consequat.
                Deserunt ullamco officia esse cupidatat sint ex non aliqua anim in do duis fugiat. Elit magna anim aute ullamco mollit. Sit eu adipisicing exercitation laboris. Aliquip tempor est veniam Lorem id sunt nisi incididunt. Quis sunt in aliqua Lorem excepteur aliqua sit adipisicing. Id eiusmod irure cillum veniam minim aute aute qui veniam nulla. Officia esse est proident in.
                Est eu id amet ea culpa enim est officia eiusmod mollit excepteur qui exercitation mollit. Minim fugiat incididunt nulla consequat. Occaecat labore irure dolore sint qui nulla laborum consequat adipisicing incididunt nisi ipsum commodo. Aliquip pariatur in eiusmod ex consequat sit duis aute do occaecat proident. Magna ad esse enim duis dolor quis qui veniam mollit excepteur occaecat esse quis non. Ipsum cupidatat exercitation veniam pariatur fugiat.
                Nostrud eu in commodo aliqua labore consequat excepteur elit. Do amet cillum sint veniam officia ad laborum. Anim nostrud deserunt tempor pariatur Lorem consequat sit proident officia sunt culpa elit fugiat sunt. Ex voluptate incididunt adipisicing ut ad mollit minim. Magna est voluptate commodo id Lorem aliqua excepteur ea nostrud laboris cupidatat. Ad et culpa quis nisi. Nostrud Lorem excepteur excepteur aliqua eiusmod elit do ullamco nostrud enim consectetur aute.
                Reprehenderit pariatur qui officia dolor ullamco esse cupidatat do incididunt. Velit fugiat reprehenderit sint dolore deserunt qui minim ut excepteur id dolor aute dolore. Amet velit irure duis nisi Lorem mollit irure duis culpa non veniam nulla. Ex incididunt id labore elit nulla minim commodo.`};
    this.createBlog(blog);
  }

  getAllBlogs(): Observable<Blog[]> {
    return of(this.blogs);
  }

  createBlog(blog: Blog): Observable<Blog> {
    const newId = this.blogs.length > 0
      ? Math.max(...this.blogs.map(b => b.id)) + 1
      : 1;
    const newBlog: Blog = { ...blog, id: newId };
    this.blogs = [...this.blogs, newBlog];
    return of(newBlog);
  }

  updateBlog(blog: Blog): Observable<Blog> {
    const index = this.blogs.findIndex(b => b.id === blog.id);
    if (index !== -1) {
      this.blogs = [
        ...this.blogs.slice(0, index),
        blog,
        ...this.blogs.slice(index + 1)
      ];
    }
    return of(blog);
  }

  deleteBlog(id: number): Observable<void> {
    this.blogs = this.blogs.filter(b => b.id !== id);
    return of(undefined);
  }
}
