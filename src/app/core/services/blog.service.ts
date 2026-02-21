import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environment/enviroment';

@Injectable({ providedIn: 'root' })
export class BlogService {
    private apiUrl = `${environment.apiUrl}/blog`;

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) { }

    getBlogs(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    getBlog(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    getBlogById(id: string): Observable<any> {
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
