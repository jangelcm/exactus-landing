import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { TargetAudienceComponent } from '../../shared/components/target-audience/target-audience.component';
import { AppMainServicesComponent } from '../../shared/components/app-main-services/app-main-services.component';
@Component({
    selector: 'app-home',
    imports: [CommonModule, CarouselComponent,TargetAudienceComponent,AppMainServicesComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
  slides = [
    {
      image: 'assets/slider/tributaria.jpg',
      title: 'Asesoría Tributaria',
      description: 'Controles y cumplimiento de normas tributarias para tu empresa.',
      link: '/servicios'
    },
    {
      image: 'assets/slider/laboral.jpg',
      title: 'Asesoría Laboral',
      description: 'Gestión laboral y obligaciones legales con precisión y experiencia.',
      link: '/servicios'
    },
    {
      image: 'assets/slider/juridica.jpg',
      title: 'Asesoría Jurídica',
      description: 'Servicios legales, derecho mercantil, civil, penal y más.',
      link: '/servicios'
    },
    {
      image: 'assets/slider/outsourcing.jpg',
      title: 'Outsourcing Contable',
      description: 'Delegación de áreas no estratégicas para que te enfoques en tu negocio.',
      link: '/servicios'
    },
    {
      image: 'assets/slider/auditoria-tributaria.jpg',
      title: 'Auditoría Tributaria',
      description: 'Fiscalización y cumplimiento tributario profesional.',
      link: '/servicios'
    },
    {
      image: 'assets/slider/auditoria-financiera.png',
      title: 'Auditoría Financiera',
      description: 'Opinión técnica sobre tus estados financieros.',
      link: '/servicios'
    },
    // {
    //   youtube: '6eflf35FwFM',
    //   image: 'assets/slider/video-thumb.jpg',
    //   title: 'Conócenos en video',
    //   description: 'Descubre cómo ayudamos a empresas como la tuya.',
    //   link: '/videos'
    // }
  ];
}
