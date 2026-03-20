import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { TranslocoModule } from '@jsverse/transloco';


@Component({
  selector: 'app-main-services',
  imports: [RouterLink, CommonModule, AnimateOnScrollDirective, TranslocoModule],
  templateUrl: './app-main-services.component.html',
  styleUrl: './app-main-services.component.css'
})
export class AppMainServicesComponent {
  services = [
    {
      icon: '/assets/icons/contable.svg',
      key: 'accounting',
      ctaLink: '/servicios/asesoria-contable',
      color: '#bd2426'
    },
    {
      icon: '/assets/icons/tributaria.svg',
      key: 'tax',
      ctaLink: '/servicios/asesoria-tributaria',
      color: '#358e4a'
    },
    {
      icon: '/assets/icons/laboral.svg',
      key: 'labor',
      ctaLink: '/servicios/asesoria-laboral',
      color: '#408bc4'
    },
    {
      icon: '/assets/icons/auditoria.svg',
      key: 'audit',
      ctaLink: '/servicios/auditorias',
      color: '#e8810b '
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
