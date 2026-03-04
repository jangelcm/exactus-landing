import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environment/enviroment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private platformId = inject(PLATFORM_ID);
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
                    if (isPlatformBrowser(this.platformId)) {
                        localStorage.setItem(this.tokenKey, res.access_token);
                    }
                    this.isAdminSubject.next(true);
                }
            })
        );
    }

    logout(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem(this.tokenKey);
        }
        this.isAdminSubject.next(false);
    }

    isAdmin(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return !!localStorage.getItem(this.tokenKey);
        }
        return false;
    }

    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return !!localStorage.getItem(this.tokenKey);
        }
        return false;
    }

    getToken(): string | null {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(this.tokenKey);
        }
        return null;
    }

    private checkToken(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return !!localStorage.getItem(this.tokenKey);
        }
        return false;
    }
}
