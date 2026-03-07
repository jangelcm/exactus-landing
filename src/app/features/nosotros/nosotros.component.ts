import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-nosotros',
    imports: [AnimateOnScrollDirective],
    templateUrl: './nosotros.component.html',
    styleUrl: './nosotros.component.css'
})
export class NosotrosComponent {


    readonly TARGETS = {
        years: 10,
        clients: 150,
        socios: 2,
        sectores: 15
    };

    years = signal(0);
    clients = signal(0);
    socios = signal(0);
    sectoresEconomicos = signal(0);

    private started = false;

    imageLoaded = false;

    onImageLoad(): void {
        this.imageLoaded = true;
    }


    constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

    startCounters() {
        if (this.started) return; // Evita que se reinicie si el usuario sube y baja
        this.started = true;

        this.animateValue(this.years, this.TARGETS.years, 2000);
        this.animateValue(this.clients, this.TARGETS.clients, 800);
        this.animateValue(this.socios, this.TARGETS.socios, 2000);
        this.animateValue(this.sectoresEconomicos, this.TARGETS.sectores, 2000);
    }

    private animateValue(sig: any, target: number, duration: number) {
        const stepTime = Math.abs(Math.floor(duration / target));

        const finalStepTime = Math.max(stepTime, 50);

        const timer = setInterval(() => {
            sig.update((val: number) => {
                if (val < target) return val + 1;
                clearInterval(timer);
                return target;
            });
        }, finalStepTime);
    }
}