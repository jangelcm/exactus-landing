import { Component, ElementRef, ViewChild, PLATFORM_ID, inject, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

interface Cliente {
  nombre: string;
  logoUrl: string;
}

@Component({
  selector: 'app-clientes-carousel',
  imports: [CommonModule, AnimateOnScrollDirective],
  templateUrl: './clientes-carousel.component.html',
  styleUrls: ['./clientes-carousel.component.css']
})
export class ClientesCarouselComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

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

  ngAfterViewInit() {
    // ViewChild solo está disponible después de la vista inicializada
  }

  scrollLeft() {
    if (!isPlatformBrowser(this.platformId) || !this.carousel) return;

    this.carousel.nativeElement.scrollBy({
      left: -300,
      behavior: 'smooth'
    });
  }

  scrollRight() {
    if (!isPlatformBrowser(this.platformId) || !this.carousel) return;

    this.carousel.nativeElement.scrollBy({
      left: 300,
      behavior: 'smooth'
    });
  }
}