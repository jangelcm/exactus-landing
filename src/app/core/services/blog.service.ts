import { inject, Injectable, makeStateKey, PLATFORM_ID, TransferState } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environment/enviroment';
import { isPlatformServer } from '@angular/common';
import { Blog } from '../../features/blog/blog-form.component';
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

    getBlog(id: string): Observable<Blog> {
        return this.http.get<Blog>(`${this.apiUrl}/${id}`);
    }

    getBlogBySlug(slug: string): Observable<Blog> {
        console.log('[SSR] Llamando API blog:', slug);
        return this.http.get<Blog>(`${this.apiUrl}/slug/${slug}`);
    }

    getRelatedBlogs(blogId: number, limit: number = 3): Observable<Blog[]> {
        return this.http.get<Blog[]>(`${this.apiUrl}/related/${blogId}?limit=${limit}`);
    }

    createBlog(blog: Blog): Observable<Blog> {
        const headers = this.getAuthHeaders();
        return this.http.post<Blog>(this.apiUrl, blog, { headers });
    }

    updateBlog(id: string, blog: Blog): Observable<Blog> {
        const headers = this.getAuthHeaders();
        return this.http.patch<Blog>(`${this.apiUrl}/${id}`, blog, { headers });
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
