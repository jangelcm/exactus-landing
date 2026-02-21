import { Injectable, inject } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse,
    HttpInterceptorFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AlertService } from '../../shared/services/alert.service';

export const errorInterceptor: HttpInterceptorFn = (
    request: HttpRequest<unknown>,
    next: any
): Observable<HttpEvent<unknown>> => {
    const alertService = inject(AlertService);

    if (request.headers.has('X-Skip-Error-Handler')) {
        return next(request);
    }


    return next(request).pipe(
        catchError((error: HttpErrorResponse) => {
            handleError(error, alertService);
            return throwError(() => error);
        })
    );
};

function handleError(error: any, alertService: AlertService): void {
    // Obtener el mensaje del backend si está disponible
    const backendError = error.error;
    if (error.status === 401) {
        // Error de autorización
        const title = backendError?.error || 'Unauthorized';
        const message = backendError?.message || 'Acceso no autorizado';
        alertService.error(title, message, 6000);
    } else if (error.status === 403) {
        // Error de prohibición
        const message = backendError?.message || 'No tienes permisos para realizar esta acción';
        alertService.error('Acceso Prohibido', message, 6000);
    } else if (error.status >= 400 && error.status < 500) {
        // Errores del cliente (4xx)
        const message = backendError?.message || error.message || 'Error en la solicitud';
        alertService.error('Error', message, 6000);
    } else if (error.status >= 500) {
        // Errores del servidor (5xx)
        const message = backendError?.message || 'Error en el servidor. Por favor, intenta más tarde';
        alertService.error('Error del Servidor', message, 6000);
    } else if (error.status === 0) {
        // Error de conexión
        alertService.error('Error de Conexión', 'No se puede conectar con el servidor. Verifica tu conexión de internet', 6000);
    }
}

