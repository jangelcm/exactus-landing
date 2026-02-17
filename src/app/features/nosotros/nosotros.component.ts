import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'app-nosotros',
    imports: [],
    templateUrl: './nosotros.component.html',
    styleUrl: './nosotros.component.css',
    animations: [
        trigger('fadeInContent', [
            transition('* => *', [
                style({ opacity: 0 }),
                animate('800ms 500ms ease-in', style({ opacity: 1 }))
            ])
        ]),
        trigger('slideUpContent', [
            transition('* => *', [
                style({ opacity: 0, transform: 'translateY(400px)' }),
                animate(
                    '800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
                    style({ opacity: 1, transform: 'translateY(0)' })
                )
            ])
        ]),
        trigger('slideInLeft', [
            transition(':enter', [
                style({ transform: 'translateX(-100%)', opacity: 0 }),
                animate('0.8s ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
            ]),
        ]),
        trigger('slideInRight', [
            transition(':enter', [
                style({ transform: 'translateX(100%)', opacity: 0 }),
                animate('0.8s ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
            ]),
        ]),
    ]
})
export class NosotrosComponent {

    @ViewChild('valuesSection') valuesSection!: ElementRef;

    years = 0;
    clients = 0;
    socios = 0;
    sectoresEconomicos = 0;

    private animated = false;

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
