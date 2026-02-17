import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from '../../core/services/blog.service';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { HttpClient } from '@angular/common/http';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

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
    imports: [CommonModule, ReactiveFormsModule, BlogComponent],
    animations: [
        trigger('staggerFadeUp', [
            transition(':enter', [
                query('app-blog', [
                    style({ opacity: 0, transform: 'translateY(8px)' }),
                    stagger(120, [
                        animate('420ms ease-out',
                            style({ opacity: 1, transform: 'translateY(0)' })
                        )
                    ])
                ])
            ])
        ])
    ]
})
export class BlogFormComponent implements OnInit {
    @Input() blog: any = {};
    @Output() saved = new EventEmitter<void>();
    form: FormGroup;
    showForm: boolean = false;
    selectedFile: File | null = null;
    imagePreview: string | null = null;
    readonly maxImageSizeBytes = 10 * 1024 * 1024;
    imageSizeError: string | null = null;
    loading: boolean = false;

    blogs: Blog[] = [
        {
            title: 'Consejos para Optimizar la Gestión Financiera',
            content: 'Descubre estrategias clave para mejorar la planificación financiera, optimizar recursos y aumentar la rentabilidad empresarial.',
            date: new Date(2024, 3, 24),
            imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f'
        },
        {
            title: 'Reformas Tributarias 2024: Lo que tu Empresa Debe Saber',
            content: 'Analizamos los principales cambios en la normativa tributaria y cómo impactarán en las pequeñas y medianas empresas.',
            date: new Date(2024, 5, 10),
            imageUrl: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572'
        },
        {
            title: 'Planeación Estratégica para el Crecimiento Sostenible',
            content: 'Implementa una visión estratégica que permita a tu organización crecer de forma estructurada y competitiva.',
            date: new Date(2024, 7, 2),
            imageUrl: 'https://images.unsplash.com/photo-1492724441997-5dc865305da7'
        }
    ];


    constructor(private fb: FormBuilder, private blogService: BlogService, private http: HttpClient) {
        this.form = this.fb.group({
            title: [''],
            summary: [''],
            imageUrl: [''],
            content: [''],
            date: ['']
        });
    }
    ngOnInit(): void {
        this.loadBlogs();
    }

    ngOnChanges() {
        if (this.blog) {
            this.form.patchValue(this.blog);
        }
    }

    async submit() {
        if (this.imageSizeError) {
            return;
        }
        let imageUrl = this.form.value.imageUrl;
        if (this.selectedFile) {
            try {
                const res: any = await this.blogService.uploadImage(this.selectedFile);
                imageUrl = res?.imageUrl || '';
            } catch (err) {
                console.error('Error al subir la imagen', err);
            }
        }
        const blogData = {
            ...this.form.value,
            imageUrl
        };
        try {
            await this.blogService.createBlog(blogData).toPromise();
            this.loadBlogs();
            this.form.reset();
            this.selectedFile = null;
            this.imagePreview = null;
        } catch (err) {
            console.error('Error al crear el blog', err);
        }
    }

    private loadBlogs() {
        this.loading = true;
        this.blogService.getBlogs().subscribe((data: any) => {
            this.blogs = data;
            setTimeout(() => {
                this.loading = false;
            }, 700);
        });
    }

    onFileChange(event: any) {
        const file: File | undefined = event.target.files?.[0];
        if (!file) {
            this.selectedFile = null;
            this.imagePreview = null;
            this.imageSizeError = null;
            return;
        }

        if (file.size > this.maxImageSizeBytes) {
            this.selectedFile = null;
            this.imagePreview = null;
            this.imageSizeError = `La imagen supera 10 MB. Selecciona una menor.`;
            event.target.value = '';
            return;
        }

        this.imageSizeError = null;
        this.selectedFile = file;
        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    removeImage() {
        this.imagePreview = null;
        this.form.patchValue({ imageUrl: null });
        this.imageSizeError = null;
    }

}
