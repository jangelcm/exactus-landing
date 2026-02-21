import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
    selector: 'app-confirm-delete-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-delete-modal.component.html',
    styleUrls: ['./confirm-delete-modal.component.css'],
    animations: [
        trigger('backdropFadeIn', [
            transition(':enter', [
                style({ opacity: 0 }),
                animate('200ms ease-out', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ opacity: 0 }))
            ])
        ]),
        trigger('modalScaleIn', [
            transition(':enter', [
                style({ transform: 'scale(0.8)', opacity: 0 }),
                animate('300ms cubic-bezier(0.16, 1, 0.3, 1)', style({ transform: 'scale(1)', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('200ms ease-in', style({ transform: 'scale(0.8)', opacity: 0 }))
            ])
        ])
    ]
})
export class ConfirmDeleteModalComponent {
    @Input() isVisible: boolean = false;
    @Input() itemTitle: string = 'este elemento';
    @Input() isLoading: boolean = false;

    @Output() onConfirm = new EventEmitter<void>();
    @Output() onCancel = new EventEmitter<void>();

    confirm() {
        this.onConfirm.emit();
    }

    cancel() {
        this.onCancel.emit();
    }

    backdropClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            this.cancel();
        }
    }
}
