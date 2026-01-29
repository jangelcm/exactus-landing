import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface TargetAudience {
  icon: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink?: string;
}

@Component({
  selector: 'app-target-audience',
  templateUrl: './target-audience.component.html',
  imports: [ RouterLink, CommonModule ],
})
export class TargetAudienceComponent {

  audiences: TargetAudience[] = [
    {
      icon: '🏢',
      title: 'Empresas y Corporaciones',
      description: 'Asesoría integral en cumplimiento legal, tributario, laboral y gestión de riesgos corporativos.',
      ctaLabel: 'Ver soluciones empresariales',
      ctaLink: '/servicios/empresas'
    },
    {
      icon: '🚀',
      title: 'PYMES y Emprendedores',
      description: 'Acompañamiento legal y contable para crecer con estructura, orden y respaldo profesional.',
      ctaLabel: 'Ver soluciones para PYMES',
      ctaLink: '/servicios/pymes'
    },
    {
      icon: '👨‍⚖️',
      title: 'Personas Naturales',
      description: 'Defensa legal personalizada en procesos civiles, laborales, administrativos y patrimoniales.',
      ctaLabel: 'Ver asesoría personal',
      ctaLink: '/servicios/personas'
    },
    {
      icon: '🧾',
      title: 'Fiscalizaciones SUNAT',
      description: 'Defensa especializada en fiscalizaciones, reclamaciones y procedimientos ante SUNAT.',
      ctaLabel: 'Ver defensa tributaria',
      ctaLink: '/servicios/defensa-tributaria'
    }
  ];

}
