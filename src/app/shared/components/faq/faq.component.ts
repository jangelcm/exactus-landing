import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

export interface FAQ {
    id: number;
    pregunta: string;
    respuesta: string;
    expanded?: boolean;
}

@Component({
    selector: 'app-faq',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './faq.component.html',
    styleUrl: './faq.component.css',
    animations: [
        trigger('expandCollapse', [
            transition(':enter', [
                style({ height: 0, opacity: 0 }),
                animate('300ms ease-out', style({ height: '*', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('300ms ease-in', style({ height: 0, opacity: 0 }))
            ])
        ])
    ]
})
export class FaqComponent {
    @Input() preguntas: FAQ[] = [];

    toggleFAQ(index: number): void {
        this.preguntas[index].expanded = !this.preguntas[index].expanded;
    }
}
