import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

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
  imports: [RouterLink,CommonModule],
  templateUrl: './app-main-services.component.html',
  styleUrl: './app-main-services.component.css'
})
export class AppMainServicesComponent {

  services: MainService[] = [
    {
      icon: '⚖️',
      title: 'Asesoría Legal',
      description: 'Defensa y acompañamiento legal integral para empresas y personas naturales.',
      highlights: [
        'Derecho laboral',
        'Derecho societario',
        'Procesos judiciales',
        'Derecho civil y administrativo'
      ],
      ctaLabel: 'Ver asesoría legal',
      ctaLink: '/servicios/asesoria-legal'
    },
    {
      icon: '🧾',
      title: 'Asesoría Tributaria y Contable',
      description: 'Optimización fiscal, cumplimiento tributario y gestión contable profesional.',
      highlights: [
        'Planeamiento tributario',
        'Fiscalizaciones SUNAT',
        'Outsourcing contable',
        'Reclamaciones tributarias'
      ],
      ctaLabel: 'Ver asesoría tributaria',
      ctaLink: '/servicios/asesoria-tributaria'
    },
    {
      icon: '📊',
      title: 'Auditoría y Consultoría',
      description: 'Auditorías especializadas y consultoría estratégica para toma de decisiones.',
      highlights: [
        'Auditoría financiera',
        'Auditoría tributaria',
        'Informes especiales',
        'Consultoría empresarial'
      ],
      ctaLabel: 'Ver auditoría y consultoría',
      ctaLink: '/servicios/auditoria'
    }
  ];

}
