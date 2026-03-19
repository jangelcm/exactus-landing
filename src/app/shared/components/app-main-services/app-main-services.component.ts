import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { TranslocoDirective, TranslocoModule } from '@jsverse/transloco';

interface MainService {
  icon: string;
  title: string;
  description: string;
  highlights: string[];
  ctaLabel: string;
  ctaLink: string;
}

@Component({
  selector: 'app-main-services',
  imports: [RouterLink, CommonModule, AnimateOnScrollDirective, TranslocoModule],
  templateUrl: './app-main-services.component.html',
  styleUrl: './app-main-services.component.css'
})
export class AppMainServicesComponent {
  services = [
    {
      icon: '📊',
      key: 'accounting',
      ctaLink: '/servicios/asesoria-contable',
      color: '#D32f2f'
    },
    {
      icon: '⚖️',
      key: 'tax',
      ctaLink: '/servicios/asesoria-tributaria',
      color: '#1976d2'
    },
    {
      icon: '👥',
      key: 'labor',
      ctaLink: '/servicios/asesoria-laboral',
      color: '#388e3c'
    },
    {
      icon: '🔍',
      key: 'audit',
      ctaLink: '/servicios/auditorias',
      color: '#fbc02d'
    }
  ];

  highlightsMap: { [key: string]: string[] } = {};

  translocoService = inject(TranslocoService);

  constructor() {
    this.services.forEach(service => {
      this.translocoService.selectTranslateObject(`mainServices.services.${service.key}.highlights`).subscribe((arr: any) => {
        this.highlightsMap[service.key] = Array.isArray(arr) ? arr : [];
      });
    });
  }

  getServiceHighlights(key: string): string[] {
    return this.highlightsMap[key] || [];
  }

}
