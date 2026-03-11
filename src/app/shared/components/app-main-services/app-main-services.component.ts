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
      title: 'Asesoría Contable & Outsourcing', // Añadimos "Outsourcing" (Keyword clave)
      description: 'Gestión contable integral bajo NIIF y principios contables vigentes en Perú. Transformamos su contabilidad en una herramienta de toma de decisiones.',
      highlights: [
        'Estados Financieros Mensuales y Anuales (NIIF)',
        'Libros Contables Electrónicos (PLE / SIRE)', // Añadimos SIRE (tendencia actual en Perú)
        'Outsourcing Contable para MYPES y Medianas Empresas',
        'Reconstrucción y Regularización Contable'
      ],
      ctaLabel: 'Ver servicios contables',
      ctaLink: '/servicios/asesoria-contable',
      color: '#D32f2f'
    },
    {
      icon: '⚖️',
      title: 'Asesoría Tributaria',
      description: 'Planeamiento estratégico para optimizar la carga impositiva y asegurar el cumplimiento total ante SUNAT, evitando multas y contingencias.',
      highlights: [
        'Declaraciones Juradas Mensuales y Anuales',
        'Defensa ante Fiscalizaciones de SUNAT',
        'Recuperación de IGV y Devolución de Percepciones', // Valor agregado alto
        'Análisis de Detracciones y Retenciones'
      ],
      ctaLabel: 'Ver servicios tributarios',
      ctaLink: '/servicios/asesoria-tributaria',
      color: '#1976d2'
    },
    {
      icon: '👥',
      title: 'Asesoría Laboral',
      description: 'Administración de nómina y cumplimiento normativo ante MINTRA y SUNAFIL para garantizar una gestión humana libre de riesgos legales.',
      highlights: [
        'Cálculo de Planilla Electrónica (PLAME y T-Registro)',
        'Liquidación de Beneficios Sociales y CTS',
        'Gestión de Contratos Laborales y Adendas',
        'Auditoría Laboral Preventiva (Cero Multas SUNAFIL)'
      ],
      ctaLabel: 'Ver servicios laborales',
      ctaLink: '/servicios/asesoria-laboral',
      color: '#388e3c'
    },
    {
      icon: '🔍',
      title: 'Auditorías',
      description: 'Exámenes críticos y sistemáticos de sus finanzas para asegurar transparencia ante socios, bancos y entidades reguladoras.',
      highlights: [
        'Auditoría Financiera para Entidades Bancarias',
        'Auditoría Tributaria Preventiva (Diagnóstico)',
        'Estudios de Precios de Transferencia',
        'Evaluación de Controles Internos y Riesgos'
      ],
      ctaLabel: 'Ver servicios de auditoría',
      ctaLink: '/servicios/auditorias',
      color: '#fbc02d'
    }
  ];

}
