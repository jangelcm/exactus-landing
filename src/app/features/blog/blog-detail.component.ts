import { Component, OnInit, PLATFORM_ID, Renderer2, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../core/services/blog.service';
import { Meta, Title } from '@angular/platform-browser';
import { CommonModule, isPlatformBrowser } from '@angular/common';

export interface Blog {
    id?: number;
    title: string;
    content: string;
    summary?: string;
    date: Date;
    imageUrl?: string;
    author?: string;
    slug?: string;
}

@Component({
    selector: 'app-blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.css'],
    imports: [CommonModule],
    standalone: true
})
export class BlogDetailComponent implements OnInit {

    private platformId = inject(PLATFORM_ID);
    private route = inject(ActivatedRoute);
    private blogService = inject(BlogService);
    private titleService = inject(Title);
    private metaService = inject(Meta);
    private renderer = inject(Renderer2);

    blog: Blog | null = null;
    loading = true;
    relatedBlogs: Blog[] = [];
    notFound = false;
    currentUrl = '';
    encodeURIComponent = encodeURIComponent;

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            this.currentUrl = window.location.href;
        }

        // Suscripción al parámetro 'slug'
        this.route.params.subscribe(params => {
            const slug = params['slug'];
            if (slug) {
                this.loadBlogDetail(slug);
            }
        });
    }

    loadBlogDetail(slug: string): void {
        this.loading = true;
        // IMPORTANTE: Tu servicio ahora debe buscar por slug
        this.blogService.getBlogBySlug(slug).subscribe({
            next: (blog: Blog) => {
                this.blog = blog;
                this.updateSEO(blog);
                this.injectSchema(blog); // SEO Avanzado: JSON-LD
                // this.loadRelatedBlogs(blog.id);
                this.loading = false;
            },
            error: () => {
                this.notFound = true;
                this.loading = false;
                this.titleService.setTitle('Artículo no encontrado - Exactus Consultores');
            }
        });
    }

    private updateSEO(blog: Blog): void {
        const fullTitle = `${blog.title} | Blog Exactus Contadores Perú`;
        const description = blog.summary || blog.content.substring(0, 160).replace(/\n/g, ' ');

        this.titleService.setTitle(fullTitle);

        // Meta Tags Estándar
        this.metaService.updateTag({ name: 'description', content: description });
        this.metaService.updateTag({ name: 'keywords', content: `contabilidad peru, sunat, ${blog.title}, asesoría empresarial lima` });
        this.metaService.updateTag({ name: 'robots', content: 'index, follow' });
        this.metaService.updateTag({ name: 'author', content: blog.author || 'Exactus Consultoría' });

        // Open Graph (Facebook / LinkedIn)
        this.metaService.updateTag({ property: 'og:title', content: fullTitle });
        this.metaService.updateTag({ property: 'og:description', content: description });
        this.metaService.updateTag({ property: 'og:image', content: blog.imageUrl || 'https://exactus.pe/assets/og-default.jpg' });
        this.metaService.updateTag({ property: 'og:url', content: this.currentUrl });
        this.metaService.updateTag({ property: 'og:type', content: 'article' });

        // Twitter
        this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
        this.metaService.updateTag({ name: 'twitter:title', content: fullTitle });
        this.metaService.updateTag({ name: 'twitter:description', content: description });
    }

    private injectSchema(blog: Blog): void {
        if (!isPlatformBrowser(this.platformId)) return;

        const schema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.title,
            "image": blog.imageUrl,
            "author": {
                "@type": "Organization",
                "name": "Exactus Consultoría Empresarial"
            },
            "publisher": {
                "@type": "Organization",
                "name": "Exactus",
                "logo": { "@type": "ImageObject", "url": "https://exactus.pe/assets/logo.png" }
            },
            "datePublished": blog.date,
            "description": blog.summary
        };

        const script = this.renderer.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify(schema);
        this.renderer.appendChild(document.head, script);
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    goBack(): void {
        if (isPlatformBrowser(this.platformId)) {
            window.history.back();
        }
    }

    copyLink(): void {
        if (isPlatformBrowser(this.platformId)) {
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                // Puedes agregar una notificación aquí
                alert('Enlace copiado al portapapeles');
            });
        }
    }
}
