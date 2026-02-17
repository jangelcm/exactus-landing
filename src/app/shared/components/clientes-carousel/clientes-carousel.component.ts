import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';


interface Cliente {
  nombre: string;
  logoUrl: string; // Usaremos URLs de logos SVG para mejor calidad
}

@Component({
  selector: 'app-clientes-carousel',
  imports: [CommonModule],
  templateUrl: './clientes-carousel.component.html',
  styleUrls: ['./clientes-carousel.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(0)' }),
        animate('0s')
      ]),
      transition(':leave', [
        animate('0s', style({ transform: 'translateX(0)' }))
      ])
    ]),
    trigger('infiniteScroll', [
      transition('* <=> *', [
        style({ transform: 'translateX(0)' }),
        animate('40s linear', style({ transform: 'translateX(100%)' }))
      ])
    ]),
    trigger('infiniteScrollReverse', [
      transition('* <=> *', [
        style({ transform: 'translateX(0)' }),
        animate('40s linear', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class ClientesCarouselComponent {
  clientes: Cliente[] = [
    { nombre: 'Google', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/google.svg' },
    { nombre: 'Adobe', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/adobe.svg' },
    { nombre: 'Figma', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/figma.svg' },
    { nombre: 'Hubspot', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/hubspot.svg' },
    { nombre: 'Stripe', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/stripe.svg' },
    { nombre: 'Slack', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/slack.svg' },
    { nombre: 'Amazon', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazon.svg' },
    { nombre: 'Microsoft', logoUrl: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoft.svg' },
  ];


  // Duplicamos para efecto infinito
  get clientesLoop() {
    return [...this.clientes, ...this.clientes];
  }
}
