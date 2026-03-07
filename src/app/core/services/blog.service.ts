import { inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environment/enviroment';
import { isPlatformServer } from '@angular/common';
const BLOGS_KEY = makeStateKey<any>('blog');

@Injectable({ providedIn: 'root' })
export class BlogService {
    private apiUrl = `${environment.apiUrl}/blog`;


    private http = inject(HttpClient);
    private state = inject(TransferState);
    private platformId = inject(PLATFORM_ID);
    private authService = inject(AuthService);

    getBlogs() {
        if (this.state.hasKey(BLOGS_KEY)) {
            const data = this.state.get(BLOGS_KEY, null);
            // No eliminar el TransferState aquí, así está disponible para todos los consumidores
            return of(data);
        }
        return this.http.get(this.apiUrl).pipe(
            tap(data => {
                if (isPlatformServer(this.platformId)) {
                    this.state.set(BLOGS_KEY, data);
                }
            })
        );
    }

    getBlog(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    getBlogById(id: string): Observable<any> {
        console.log('[SSR] Llamando API blog:', id);
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    getRelatedBlogs(blogId: number, limit: number = 3): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/related/${blogId}?limit=${limit}`);
    }

    createBlog(blog: any): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.post<any>(this.apiUrl, blog, { headers });
    }

    updateBlog(id: string, blog: any): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.patch<any>(`${this.apiUrl}/${id}`, blog, { headers });
    }

    deleteBlog(id: string): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
    }

    uploadImage(file: File): Promise<any> {
        const formData = new FormData();
        formData.append('image', file);
        return this.http.post<any>(`${environment.apiUrl}/blog/upload-image`, formData).toPromise();
    }

    private getAuthHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
            Authorization: token ? `Bearer ${token}` : ''
        });
    }
}
