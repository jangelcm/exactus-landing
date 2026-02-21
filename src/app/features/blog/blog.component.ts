import { Component, Input, OnInit, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../shared/services/alert.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ConfirmDeleteModalComponent } from '../../shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { ConfirmEditModalComponent } from '../../shared/components/confirm-edit-modal/confirm-edit-modal.component';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
    imports: [CommonModule, RouterLink, ConfirmDeleteModalComponent, ConfirmEditModalComponent],
})
export class BlogComponent {

    @Input() blog: any = {};
    @Input() isAdmin: boolean = false; // Para mostrar botones de editar/eliminar
    @Output() onEdit = new EventEmitter<any>();
    @Output() onDelete = new EventEmitter<any>();

    showDeleteModal: boolean = false;
    showEditModal: boolean = false;
    isDeleting: boolean = false;

    constructor(
        private blogService: BlogService,
        private authService: AuthService,
        private alertService: AlertService
    ) { }

    edit(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        this.showEditModal = true;
    }

    confirmEdit(): void {
        this.showEditModal = false;
        this.onEdit.emit(this.blog);
    }

    cancelEdit(): void {
        this.showEditModal = false;
    }

    delete(event: Event): void {
        event.stopPropagation();
        event.preventDefault();
        this.showDeleteModal = true;
    }

    confirmDelete(): void {
        this.isDeleting = true;
        this.blogService.deleteBlog(this.blog.id).subscribe(
            () => {
                this.isDeleting = false;
                this.showDeleteModal = false;
                this.alertService.success('Éxito', 'Blog eliminado correctamente');
                this.onDelete.emit(this.blog);
            },
            (err) => {
                this.isDeleting = false;
                console.error('Error al eliminar el blog', err);
                this.alertService.error('Error', 'Error al eliminar el blog');
            }
        );
    }

    cancelDelete(): void {
        this.showDeleteModal = false;
    }

}
