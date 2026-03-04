import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
    styleUrl: './faq.component.css'
})
export class FaqComponent {
    @Input() preguntas: FAQ[] = [];

    toggleFAQ(index: number): void {
        this.preguntas[index].expanded = !this.preguntas[index].expanded;
    }
}
