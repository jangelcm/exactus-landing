import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
    selector: '[appAnimateOnScroll]',
    standalone: true
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
    @Input() animationType: 'fadeIn' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scaleUp' = 'fadeIn';
    @Input() animationDuration: number = 700;
    @Input() animationDelay: number = 0;
    @Input() threshold: number = 0.1;

    private observer!: IntersectionObserver;

    constructor(private el: ElementRef) { }

    ngOnInit() {
        this.setupInitialState();
        this.createObserver();
    }

    private setupInitialState() {
        const element = this.el.nativeElement;
        element.style.transition = `all ${this.animationDuration}ms ease-out`;
        element.style.transitionDelay = `${this.animationDelay}ms`;

        switch (this.animationType) {
            case 'fadeIn':
                element.style.opacity = '0';
                break;
            case 'slideUp':
                element.style.opacity = '0';
                element.style.transform = 'translateY(100px)';
                break;
            case 'slideDown':
                element.style.opacity = '0';
                element.style.transform = 'translateY(-30px)';
                break;
            case 'slideLeft':
                element.style.opacity = '0';
                element.style.transform = 'translateX(30px)';
                break;
            case 'slideRight':
                element.style.opacity = '0';
                element.style.transform = 'translateX(-30px)';
                break;
            case 'scaleUp':
                element.style.opacity = '0';
                element.style.transform = 'scale(0.95)';
                break;
        }
    }

    private createObserver() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animate();
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: this.threshold }
        );

        this.observer.observe(this.el.nativeElement);
    }

    private animate() {
        const element = this.el.nativeElement;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0) translateX(0) scale(1)';
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
