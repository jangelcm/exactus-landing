import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environment/enviroment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth/login`;

    constructor(private http: HttpClient) { }

    login(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post<any>(this.apiUrl, credentials).pipe(
            tap(res => {
                if (res && res.access_token) {
                    console.log('Token recibido:', res.access_token);
                    localStorage.setItem('access_token', res.access_token);
                }
            })
        );
    }

    logout() {
        localStorage.removeItem('access_token');
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('access_token');
    }

    getToken(): string | null {
        return localStorage.getItem('access_token');
    }
}
