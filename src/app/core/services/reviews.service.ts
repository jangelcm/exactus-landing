import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from '../../environment/enviroment';
import { GoogleReviewsResponse } from '../models/review.model';

@Injectable({
    providedIn: 'root'
})
export class GoogleReviewsService {
    private readonly apiUrl = `${environment.apiUrl}/google-reviews`;
    private reviewsCache = new Map<string, GoogleReviewsResponse>();
    private cacheExpiryTime = 60 * 60 * 1000; // 1 hora

    // BehaviorSubjects para estado global
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    private errorSubject = new BehaviorSubject<string | null>(null);
    public error$ = this.errorSubject.asObservable();

    constructor(private http: HttpClient) {
        this.startCacheCleanup();
    }

    /**
     * Obtiene todas las reseñas de una ubicación
     *
     * @param locationName - Formato: accounts/{accountId}/locations/{locationId}
     * @param pageSize - Número de reseñas (default: 50, max: 100)
     * @param useCache - Usar caché si está disponible (default: true)
     * @returns Observable<GoogleReviewsResponse>
     */
    getLocationReviews(
        locationName: string,
        pageSize: number = 50,
        useCache: boolean = true
    ): Observable<GoogleReviewsResponse> {
        const cacheKey = `location-${locationName}-${pageSize}`;

        // Verificar caché
        if (useCache && this.reviewsCache.has(cacheKey)) {
            return new Observable(subscriber => {
                subscriber.next(this.reviewsCache.get(cacheKey)!);
                subscriber.complete();
            });
        }

        return this.makeRequest<GoogleReviewsResponse>(
            `${this.apiUrl}/location`,
            { locationName, pageSize: pageSize.toString() },
            cacheKey
        );
    }

    /**
     * Obtiene reseñas filtradas por calificación mínima
     *
     * @param locationName - Nombre de la ubicación
     * @param minRating - Calificación mínima (1-5)
     * @param pageSize - Número de reseñas
     * @param useCache - Usar caché
     */
    getReviewsByRating(
        locationName: string,
        minRating: number = 1,
        pageSize: number = 50,
        useCache: boolean = true
    ): Observable<GoogleReviewsResponse> {
        const rating = Math.max(1, Math.min(5, minRating));
        const cacheKey = `rating-${locationName}-${rating}-${pageSize}`;

        if (useCache && this.reviewsCache.has(cacheKey)) {
            return new Observable(subscriber => {
                subscriber.next(this.reviewsCache.get(cacheKey)!);
                subscriber.complete();
            });
        }

        return this.makeRequest<GoogleReviewsResponse>(
            `${this.apiUrl}/by-rating`,
            { locationName, minRating: rating.toString(), pageSize: pageSize.toString() },
            cacheKey
        );
    }

    /**
     * Obtiene reseñas recientes de los últimos X días
     *
     * @param locationName - Nombre de la ubicación
     * @param daysAgo - Número de días hacia atrás (default: 30)
     * @param pageSize - Número de reseñas
     * @param useCache - Usar caché
     */
    getRecentReviews(
        locationName: string,
        daysAgo: number = 30,
        pageSize: number = 50,
        useCache: boolean = true
    ): Observable<GoogleReviewsResponse> {
        const cacheKey = `recent-${locationName}-${daysAgo}-${pageSize}`;

        if (useCache && this.reviewsCache.has(cacheKey)) {
            return new Observable(subscriber => {
                subscriber.next(this.reviewsCache.get(cacheKey)!);
                subscriber.complete();
            });
        }

        return this.makeRequest<GoogleReviewsResponse>(
            `${this.apiUrl}/recent`,
            { locationName, daysAgo: daysAgo.toString(), pageSize: pageSize.toString() },
            cacheKey
        );
    }

    /**
     * Limpia el caché manualmente
     */
    clearCache(): void {
        this.reviewsCache.clear();
    }

    /**
     * Obtiene el tamaño del caché en bytes
     */
    getCacheSizeInBytes(): number {
        let size = 0;
        this.reviewsCache.forEach(value => {
            size += JSON.stringify(value).length;
        });
        return size;
    }

    /**
     * Método privado para hacer requests reutilizable
     */
    private makeRequest<T>(
        url: string,
        params: Record<string, string>,
        cacheKey: string
    ): Observable<T> {
        this.loadingSubject.next(true);

        let httpParams = new HttpParams();
        Object.keys(params).forEach(key => {
            httpParams = httpParams.set(key, params[key]);
        });

        return this.http.get<T>(url, { params: httpParams }).pipe(
            retry({ count: 1, delay: 1000 }), // Reintentar una vez si falla
            tap(response => {
                // Guardar en caché
                this.reviewsCache.set(cacheKey, response as any);
                this.loadingSubject.next(false);
                this.errorSubject.next(null);
            }),
            catchError(error => {
                this.loadingSubject.next(false);
                const errorMessage = this.handleError(error);
                this.errorSubject.next(errorMessage);
                return throwError(() => ({ error: errorMessage, originalError: error }));
            })
        );
    }

    /**
     * Manejo centralizado de errores
     */
    private handleError(error: any): string {
        if (error.error instanceof ErrorEvent) {
            // Error del cliente
            return `Error: ${error.error.message}`;
        } else {
            // Error del servidor
            const apiError: any = error.error;
            switch (error.status) {
                case 400:
                    return apiError.message || 'Solicitud inválida. Verifica los parámetros.';
                case 401:
                    return 'No autorizado. Por favor, verifica tus credenciales.';
                case 404:
                    return 'Recurso no encontrado.';
                case 500:
                    return 'Error interno del servidor. Inténtalo de nuevo más tarde.';
                default:
                    return `Algo salió mal. Código de error: ${error.status}`;
            }
        }
    }

    private startCacheCleanup() {
        setInterval(() => {
            this.reviewsCache.clear();
        }, this.cacheExpiryTime);
    }
}
