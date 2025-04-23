import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/v1/auth'; // Update if needed

  constructor(private http: HttpClient, private router: Router) {}

  register(user: RegisterPayload): Observable<any> {
    const payload = {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: user.password,
      role: user.role
    };

    return this.http.post(`${this.apiUrl}/register`, payload);
  }

  login(credentials: LoginPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { withCredentials: true }).pipe(
      tap((res: any) => {
        console.log('Login response:', res);
        localStorage.setItem('token', res.token.accessToken); 
        localStorage.setItem('user', JSON.stringify(res.user));
      })
      
    );
  }
  

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => {
        localStorage.removeItem('user');
        this.router.navigate(['']);
      })
    );
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
