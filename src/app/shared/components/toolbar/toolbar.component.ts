import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import  * as AuthActions  from '@shared/state/actions/auth.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectCurrentUser } from '@shared/state/selectors/auth.selectors';
import { User } from '@shared/models/user.model';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [ MatToolbarModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  @Input({ required: true }) drawer!: MatDrawer;

  private store = inject(Store);

  user = toSignal(this.store.select(selectCurrentUser), { initialValue: null as User | null });

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

}
