import { Component, ElementRef, ViewChild } from '@angular/core';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-nosotros',
    imports: [AnimateOnScrollDirective],
    templateUrl: './nosotros.component.html',
    styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {

    @ViewChild('valuesSection') valuesSection!: ElementRef;
    years = 0;
    clients = 0;
    socios = 0;
    sectoresEconomicos = 0;

    private animated = false;

    imageLoaded = false;

    onImageLoad(): void {
        this.imageLoaded = true;
    }

    ngAfterViewInit() {
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && !this.animated) {
                this.startCounters();
                this.animated = true;
                observer.disconnect();
            }
        }, { threshold: 0.4 });

        observer.observe(this.valuesSection.nativeElement);
    }

    startCounters() {
        this.animateValue('years', 10, 1500);
        this.animateValue('clients', 150, 1500);
        this.animateValue('socios', 2, 1000);
        this.animateValue('sectoresEconomicos', 15, 1500);
    }

    animateValue(property: keyof this, end: number, duration: number) {
        const start = 0;
        const startTime = performance.now();

        const step = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            this[property] = Math.floor(progress * end) as any;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                this[property] = end as any;
            }
        };

        requestAnimationFrame(step);
    }
}
