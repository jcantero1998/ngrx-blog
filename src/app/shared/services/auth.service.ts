import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUser: User = { email: 'admin@mail.com', id: 1, password: 'password123' };

  login(email: string, password: string): Observable<User | null> {
    // TODO: Login simulado, reemplazar con la lógica real
    if (email === this.mockUser.email && password === this.mockUser.password) {
      return of(this.mockUser);
    }
    return of(null);
  }

  register(email: string, password: string): Observable<User> {
    return of({ email, id: Math.floor(Math.random() * 100), password });
  }
}
