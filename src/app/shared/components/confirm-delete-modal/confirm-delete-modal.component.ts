import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-confirm-delete-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-delete-modal.component.html',
    styleUrls: ['./confirm-delete-modal.component.css']
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
