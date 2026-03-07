import { Component, inject, Input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../../core/services/blog.service';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../shared/services/alert.service';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { firstValueFrom } from 'rxjs';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

export interface Blog {
    id?: number;
    title: string;
    content: string;
    summary?: string;
    date: Date;
    imageUrl?: string;
}


@Component({
    selector: 'app-blog-form',
    templateUrl: './blog-form.component.html',
    styleUrls: ['./blog-form.component.css'],
    imports: [CommonModule, ReactiveFormsModule, BlogComponent, AnimateOnScrollDirective],

})
export class BlogFormComponent {
    private blogService = inject(BlogService);
    private fb = inject(FormBuilder);
    public authService = inject(AuthService);
    private alertService = inject(AlertService);

    // 1. Definimos el Recurso (reemplaza a this.blogs y loadBlogs)
    // Se ejecutará automáticamente al instanciar el componente
    public blogsResource = rxResource({
        loader: () => this.blogService.getBlogs()
    });

    // Signals para el estado de la UI
    showForm = signal(false);
    isEditMode = signal(false);
    submitLoading = signal(false);

    // Mantenemos esta propiedad para que no te dé el error ts(2339)
    @Input() blog: any = {};

    // Tu lógica de formulario e imágenes se mantiene similar, 
    // pero usaremos signals donde sea posible para mejor performance.
    form: FormGroup;
    imagePreview = signal<string | null>(null);
    imageSizeError = signal<string | null>(null);
    selectedFile: File | null = null;
    allowedImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
    maxImageSizeBytes = 10 * 1024 * 1024; // 10 MB
    maxImageDimensions = { width: 2000, height: 2000 };

    constructor() {
        this.form = this.fb.group({
            title: [''],
            summary: [''],
            imageUrl: [''],
            content: [''],
            date: ['']
        });
    }

    // 2. Para refrescar los datos después de crear/editar/eliminar
    async submit() {
        // ... validaciones de imagen ...
        this.submitLoading.set(true);

        try {
            // Tu lógica de upload e imagen se mantiene...
            const blogData = { ...this.form.value, imageUrl: /* result */ '' };

            if (this.isEditMode() && this.blog.id) {
                await firstValueFrom(this.blogService.updateBlog(this.blog.id, blogData));
            } else {
                await firstValueFrom(this.blogService.createBlog(blogData));
            }

            this.alertService.success('Éxito', 'Operación completada');

            // REFRESCAR: Solo llamas a reload() y rxResource se encarga de todo
            this.blogsResource.reload();

            this.cancelForm();
        } finally {
            this.submitLoading.set(false);
        }
    }

    onFileChange(event: any) {
        const file: File | undefined = event.target.files?.[0];

        // Si no hay archivo (el usuario canceló la selección)
        if (!file) {
            this.selectedFile = null;
            if (!this.isEditMode()) { // Usamos paréntesis () para leer el Signal
                this.imagePreview.set(null); // Usamos .set() para actualizar
            }
            this.imageSizeError.set(null);
            return;
        }

        // Validar tipo
        if (!this.allowedImageTypes.includes(file.type)) {
            this.imageSizeError.set('Solo se permiten JPG, PNG o WebP');
            event.target.value = '';
            return;
        }

        // Validar peso
        if (file.size > this.maxImageSizeBytes) {
            this.selectedFile = null;
            this.imageSizeError.set(`La imagen supera los 10 MB. Selecciona una menor.`);
            event.target.value = '';
            return;
        }

        // Validar dimensiones
        const img = new Image();
        img.onload = () => {
            URL.revokeObjectURL(img.src); // Liberamos memoria
            if (img.width > this.maxImageDimensions.width || img.height > this.maxImageDimensions.height) {
                this.imageSizeError.set(`Dimensiones máximas: ${this.maxImageDimensions.width}x${this.maxImageDimensions.height}px`);
                event.target.value = '';
                return;
            }
            // Si todo está bien, procesamos
            this.processImage(file);
        };
        img.src = URL.createObjectURL(file);
    }

    private processImage(file: File) {
        this.imageSizeError.set(null);
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = () => {
            // Actualizamos el signal de la previsualización
            this.imagePreview.set(reader.result as string);
        };
        reader.readAsDataURL(file);
    }

    // Simplificamos los métodos de UI
    openNewForm() {
        this.isEditMode.set(false);
        this.form.reset();
        this.imagePreview.set(null);
        this.showForm.set(true);
    }

    // Si tenías un método editBlog, asegúrate de que asigne a this.blog
    editBlog(blogData: any) {
        this.blog = blogData;
        this.isEditMode.set(true);
        this.form.patchValue(blogData);
        this.imagePreview.set(blogData.imageUrl || null);
        this.showForm.set(true);
    }

    removeImage() {
        this.form.patchValue({ imageUrl: '' });
        this.imagePreview.set(null);
    }


    cancelForm() {
        this.showForm.set(false);
        this.form.reset();
    }
}