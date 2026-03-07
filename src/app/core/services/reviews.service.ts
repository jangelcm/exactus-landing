import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, tap, throwError, timeout } from 'rxjs';
import { GoogleReviewsResponse } from '../models/review.model';

@Injectable({
    providedIn: 'root'
})
export class GoogleReviewsService {
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private errorSubject = new BehaviorSubject<string | null>(null);

    public loading$ = this.loadingSubject.asObservable();
    public error$ = this.errorSubject.asObservable();

    constructor(private http: HttpClient) { }

    getRecentReviews(locationName: string, daysAgo: number, pageSize: number): Observable<GoogleReviewsResponse> {
        this.loadingSubject.next(true);
        this.errorSubject.next(null);

        const params = new HttpParams()
            .set('locationName', locationName)
            .set('daysAgo', daysAgo.toString())
            .set('pageSize', pageSize.toString());

        return this.http.get<GoogleReviewsResponse>(`/api/reviews/recent`, { params })
            .pipe(
                timeout(5000), // Timeout de 5 segundos para SSR
                tap(() => this.loadingSubject.next(false)),
                catchError(error => {
                    this.loadingSubject.next(false);
                    this.errorSubject.next('Error al cargar las reseñas');
                    return throwError(() => error);
                })
            );
    }
}