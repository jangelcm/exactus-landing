import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

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
  imports: [RouterLink, CommonModule, AnimateOnScrollDirective],
  templateUrl: './app-main-services.component.html',
  styleUrl: './app-main-services.component.css'
})
export class AppMainServicesComponent {

  services = [
    {
      icon: '📊',
      title: 'Asesoría Contable',
      description: 'Gestión contable integral bajo Normas Internacionales de Información Financiera (NIIF), elaboración de estados financieros y optimización de procesos contables.',
      highlights: [
        'Estados financieros mensuales y anuales',
        'Libros contables electrónicos',
        'Reportes financieros para entidades externas',
        'Capacitación contable empresarial'
      ],
      ctaLabel: 'Más sobre asesoría contable',
      ctaLink: '/servicios/asesoria-contable',
      color: '#D32f2f'
    },
    {
      icon: '⚖️',
      title: 'Asesoría Tributaria',
      description: 'Planeamiento tributario estratégico y cumplimiento fiscal ante SUNAT, incluyendo detracciones, retenciones y fiscalizaciones.',
      highlights: [
        'Declaración mensual y anual de impuestos',
        'Atención de fiscalizaciones SUNAT',
        'Planeamiento tributario',
        'Declaración de Beneficiario Final'
      ],
      ctaLabel: 'Más sobre asesoría tributaria',
      ctaLink: '/servicios/asesoria-tributaria',
      color: '#1976d2'
    },
    {
      icon: '👥',
      title: 'Asesoría Laboral',
      description: 'Gestión de planillas electrónicas, cumplimiento ante MINTRA y SUNAFIL, y administración de beneficios laborales.',
      highlights: [
        'Planilla electrónica PDT 601 PLAME',
        'AFP NET y boletas de pago digitales',
        'Liquidación de beneficios sociales',
        'Atención de inspecciones laborales'
      ],
      ctaLabel: 'Más sobre asesoría laboral',
      ctaLink: '/servicios/asesoria-laboral',
      color: '#388e3c'
    },
    {
      icon: '🔍',
      title: 'Auditorías',
      description: 'Auditorías financieras, tributarias y evaluaciones de control interno para empresas nacionales y transnacionales.',
      highlights: [
        'Auditoría de estados financieros',
        'Auditoría tributaria preventiva',
        'Precios de transferencia',
        'Diagnóstico empresarial'
      ],
      ctaLabel: 'Más sobre auditorías',
      ctaLink: '/servicios/auditorias',
      color: '#fbc02d'
    }
  ];

}
