import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-confirm-edit-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-edit-modal.component.html',
    styleUrls: ['./confirm-edit-modal.component.css']
})
export class ConfirmEditModalComponent {
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
