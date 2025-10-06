import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post('/api/auth/login', { email, password }).pipe(
      tap((res: any) => {
        localStorage.setItem('access_token', res.access_token);
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  register(payload: {
    nombre: string;
    email: string;
    password: string;
    rol: string;
    telefono?: string;
  }): Observable<any> {
    return this.http.post('/api/auth/register', payload).pipe(
      tap((res: any) => {
        if (res?.access_token) {
          localStorage.setItem('access_token', res.access_token);
        }
      })
    );
  }
}
