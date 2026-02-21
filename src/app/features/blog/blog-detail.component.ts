import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

export interface Blog {
    id?: number;
    title: string;
    content: string;
    summary?: string;
    date: Date;
    imageUrl?: string;
    author?: string;
}

@Component({
    selector: 'app-blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.css'],
    imports: [CommonModule],
    standalone: true
})
export class BlogDetailComponent implements OnInit {
    blog: Blog | null = null;
    loading: boolean = true;
    relatedBlogs: Blog[] = [];
    notFound: boolean = false;
    currentUrl: string = '';
    encodeURIComponent = encodeURIComponent;

    constructor(
        private route: ActivatedRoute,
        private blogService: BlogService,
        private titleService: Title,
        private metaService: Meta
    ) { }

    ngOnInit(): void {
        this.currentUrl = typeof window !== 'undefined' ? window.location.href : '';
        this.route.params.subscribe(params => {
            const id = params['id'];
            this.loadBlogDetail(id);
        });
    }

    loadBlogDetail(id: string): void {
        this.loading = true;
        // Aquí deberías obtener el blog desde tu API usando el ID
        // Por ahora, simulo los datos
        this.blogService.getBlogById(id).subscribe({
            next: (blog) => {
                this.blog = blog;
                this.updateSEO(blog);
                // Cargar blogs relacionados (simulado) luego
                // this.loadRelatedBlogs(blog.id!);
                this.loading = false;
            },
            error: () => {
                this.notFound = true;
                this.loading = false;
                this.titleService.setTitle('Blog no encontrado - Exactus');
            }
        });
    }

    loadRelatedBlogs(blogId: number): void {
        this.blogService.getRelatedBlogs(blogId).subscribe({
            next: (blogs) => {
                this.relatedBlogs = blogs.slice(0, 3);
            },
            error: () => {
                this.relatedBlogs = [];
            }
        });
    }

    updateSEO(blog: Blog): void {
        // SEO: Actualizar título
        this.titleService.setTitle(`${blog.title} - Blog Exactus`);

        // SEO: Actualizar meta tags
        this.metaService.updateTag({
            name: 'description',
            content: blog.summary || blog.content.substring(0, 160)
        });

        this.metaService.updateTag({
            name: 'keywords',
            content: 'auditoría, asesoría, consultoría'
        });

        this.metaService.updateTag({
            name: 'author',
            content: blog.author || 'Exactus'
        });

        // SEO: Open Graph para redes sociales
        this.metaService.updateTag({
            property: 'og:title',
            content: blog.title
        });

        this.metaService.updateTag({
            property: 'og:description',
            content: blog.summary || blog.content.substring(0, 160)
        });

        this.metaService.updateTag({
            property: 'og:image',
            content: blog.imageUrl || 'https://exactus.com/default-og-image.jpg'
        });

        this.metaService.updateTag({
            property: 'og:type',
            content: 'article'
        });

        // SEO: Twitter Card
        this.metaService.updateTag({
            name: 'twitter:card',
            content: 'summary_large_image'
        });

        this.metaService.updateTag({
            name: 'twitter:title',
            content: blog.title
        });

        this.metaService.updateTag({
            name: 'twitter:description',
            content: blog.summary || blog.content.substring(0, 160)
        });

        this.metaService.updateTag({
            name: 'twitter:image',
            content: blog.imageUrl || 'https://exactus.com/default-og-image.jpg'
        });
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    goBack(): void {
        window.history.back();
    }

    copyLink(): void {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            // Puedes agregar una notificación aquí
            alert('Enlace copiado al portapapeles');
        });
    }
}
