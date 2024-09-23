import { Component, inject, OnInit, signal } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import  * as AuthActions  from '@shared/state/actions/auth.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { selectIsDevMode } from '@shared/state/selectors/general.selectors';
import { AsyncPipe } from '@angular/common';
import { CredentialsDialogComponent } from '../credentials-dialog/credentials-dialog.component';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule,MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatIconModule, AsyncPipe],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {

  private store = inject(Store);
  private fb = inject(FormBuilder);
  private passwordPattern = '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$';
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  readonly dialog = inject(MatDialog);
  isDevMode$: Observable<Boolean> = this.store.pipe(select(selectIsDevMode));
  currentUrl = '';
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
  });

  ngOnInit(): void {
    this.currentUrl = this.route.snapshot.url.join('/');
  }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  onSubmit(): void {
    if (!this.loginForm.valid) return;
    const { email, password } = this.loginForm.value;
    if (this.currentUrl === 'login') this.login(email, password);
    if (this.currentUrl === 'register') this.register(email, password);
  }

  login(email: string, password: string) {
    this.store.dispatch(AuthActions.login({ email, password }));
  }

  register(email: string, password: string){
    this.store.dispatch(AuthActions.register({ email, password }));
  }

  navigate() {
    if (this.currentUrl === 'login') this.router.navigate(['register']);
    if (this.currentUrl === 'register') this.router.navigate(['login']);
  }

  openDialog() {
    this.dialog.open(CredentialsDialogComponent);
  }

}
