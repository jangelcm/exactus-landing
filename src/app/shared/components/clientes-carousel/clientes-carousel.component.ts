import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';


interface Cliente {
  nombre: string;
  logoUrl: string; // Usaremos URLs de logos SVG para mejor calidad
}

@Component({
  selector: 'app-clientes-carousel',
  imports: [CommonModule, AnimateOnScrollDirective],
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
    { nombre: 'Efixo', logoUrl: 'assets/clientes/efixo.png' },
    { nombre: 'blue water', logoUrl: 'assets/clientes/bluewater.png' },
    { nombre: 'ecomotion', logoUrl: 'assets/clientes/ecomotion.png' },
    { nombre: 'fundacionoli', logoUrl: 'assets/clientes/fundacionoli.png' },
    { nombre: 'macpoint', logoUrl: 'assets/clientes/macpoint.png' },
    { nombre: 'esg', logoUrl: 'assets/clientes/esg.png' },
    { nombre: 'tdx', logoUrl: 'assets/clientes/tdx.png' },
    { nombre: 'trip go', logoUrl: 'assets/clientes/trip go.png' },
  ];


  @ViewChild('carousel', { static: false }) carousel!: ElementRef;

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }
}
