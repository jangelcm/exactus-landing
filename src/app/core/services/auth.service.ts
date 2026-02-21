import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environment/enviroment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth/login`;
    private tokenKey = 'admin_token';
    private isAdminSubject = new BehaviorSubject<boolean>(this.checkToken());

    isAdmin$ = this.isAdminSubject.asObservable();

    constructor(private http: HttpClient) {
        this.checkToken();
    }

    login(credentials: { email: string; password: string }): Observable<any> {
        return this.http.post<any>(this.apiUrl, credentials).pipe(
            tap(res => {
                if (res && res.access_token) {
                    localStorage.setItem(this.tokenKey, res.access_token);
                    this.isAdminSubject.next(true);
                }
            })
        );
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.isAdminSubject.next(false);
    }

    isAdmin(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    private checkToken(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }
}
