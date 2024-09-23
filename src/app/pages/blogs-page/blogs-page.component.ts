import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FooterComponent } from '@shared/components/footer/footer.component';
import { ToolbarComponent } from '@shared/components/toolbar/toolbar.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import  * as AuthActions  from '@shared/state/actions/auth.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { User } from '@shared/models/user.model';
import { selectCurrentUser } from '@shared/state/selectors/auth.selectors';
import { BlogListComponent } from "./components/blog-list/blog-list.component";
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-blogs-page',
  standalone: true,
  imports: [RouterOutlet, ToolbarComponent, MatSidenavModule, FooterComponent, MatDividerModule, MatListModule, MatButtonModule, BlogListComponent, MatIconModule, CommonModule, MatTooltipModule],
  templateUrl: './blogs-page.component.html',
  styleUrl: './blogs-page.component.scss'
})
export class BlogsPageComponent {

  private store = inject(Store);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  user = toSignal(this.store.select(selectCurrentUser), { initialValue: null as User | null });
  title: string = 'Blogs';

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setTitle();
    });
  }

  setTitle(): void {
    let activeRoute = this.activatedRoute;
    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }
    const routeData = activeRoute.snapshot.data;
    this.title = routeData['title'] || 'Blogs';
  }

  logout(){
    this.store.dispatch(AuthActions.logout());
  }

  createBlog(){
    this.router.navigate(['create']);
  }

  goBack(){
    this.router.navigate(['']);
  }

}
