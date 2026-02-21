import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Alert {
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
    private alerts$ = new BehaviorSubject<Alert[]>([]);
    private idCounter = 0;

    constructor() { }

    getAlerts(): Observable<Alert[]> {
        return this.alerts$.asObservable();
    }

    showAlert(
        type: 'success' | 'error' | 'warning' | 'info',
        title: string,
        message: string,
        duration: number = 5000
    ): string {
        const id = `alert-${++this.idCounter}`;
        const alert: Alert = { id, type, title, message, duration };

        const currentAlerts = this.alerts$.value;
        this.alerts$.next([...currentAlerts, alert]);

        if (duration > 0) {
            setTimeout(() => this.removeAlert(id), duration);
        }

        return id;
    }

    removeAlert(id: string): void {
        const currentAlerts = this.alerts$.value;
        this.alerts$.next(currentAlerts.filter(alert => alert.id !== id));
    }

    clearAllAlerts(): void {
        this.alerts$.next([]);
    }

    error(title: string, message: string, duration?: number): string {
        return this.showAlert('error', title, message, duration);
    }

    success(title: string, message: string, duration?: number): string {
        return this.showAlert('success', title, message, duration);
    }

    warning(title: string, message: string, duration?: number): string {
        return this.showAlert('warning', title, message, duration);
    }

    info(title: string, message: string, duration?: number): string {
        return this.showAlert('info', title, message, duration);
    }
}
