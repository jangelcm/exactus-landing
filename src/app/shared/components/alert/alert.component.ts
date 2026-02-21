import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertService, Alert } from '../../services/alert.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-alert',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertComponent implements OnInit, OnDestroy {
    alerts: Alert[] = [];
    private subscription!: Subscription;

    constructor(
        private alertService: AlertService,
        private cdr: ChangeDetectorRef
    ) { }

    ngOnInit(): void {
        this.subscription = this.alertService.getAlerts().subscribe(alerts => {
            this.alerts = alerts;
            this.cdr.markForCheck(); // Fuerza la detección de cambios
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    closeAlert(id: string): void {
        this.alertService.removeAlert(id);
    }

    getAlertClasses(type: string): string {
        const baseClasses = 'bg-opacity-95 backdrop-blur-sm';
        switch (type) {
            case 'error':
                return `${baseClasses} bg-red-500/90 text-white border-red-600`;
            case 'success':
                return `${baseClasses} bg-green-500/90 text-white border-green-600`;
            case 'warning':
                return `${baseClasses} bg-yellow-500/90 text-white border-yellow-600`;
            case 'info':
                return `${baseClasses} bg-blue-500/90 text-white border-blue-600`;
            default:
                return baseClasses;
        }
    }

    getIconClasses(type: string): string {
        return 'flex-shrink-0';
    }
}
