import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { AppMainServicesComponent } from '../../shared/components/app-main-services/app-main-services.component';
import { OficinasComponent } from '../../shared/components/oficinas/oficinas.component';
import { ClientesCarouselComponent } from '../../shared/components/clientes-carousel/clientes-carousel.component';
import { FaqComponent } from '../../shared/components/faq/faq.component';
import { FAQ } from '../../shared/components/faq/faq.component';
import { ReviewsComponent } from '../reviews/reviews.component';
import { AnimateOnScrollDirective } from '../../shared/directives/animate-on-scroll.directive';
import { TranslocoModule } from '@jsverse/transloco';


@Component({
  selector: 'app-home',
  imports: [CommonModule, CarouselComponent, AppMainServicesComponent, OficinasComponent, ClientesCarouselComponent, FaqComponent, ReviewsComponent, AnimateOnScrollDirective, TranslocoModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  slides = [
    {
      image: 'assets/slider/outsourcing.webp',
      title: 'carousel.slide1.title',
      alt: 'carousel.slide1.alt',
      description: 'carousel.slide1.description',
      link: '/servicios/asesoria-contable',
      height: 'h-[500px] md:h-[550px] lg:h-[calc(100vh-120px)]'
    },
    {
      image: 'assets/slider/tributaria.jpg',
      title: 'carousel.slide2.title',
      alt: 'carousel.slide2.alt',
      description: 'carousel.slide2.description',
      link: '/servicios/asesoria-tributaria',
      height: 'h-[500px] md:h-[550px] lg:h-[calc(100vh-120px)]'
    },
    {
      image: 'assets/slider/laboral.jpg',
      title: 'carousel.slide3.title',
      alt: 'carousel.slide3.alt',
      description: 'carousel.slide3.description',
      link: '/servicios/asesoria-laboral',
      height: 'h-[500px] md:h-[550px] lg:h-[calc(100vh-120px)]'
    },
    {
      image: 'assets/slider/auditoria-tributaria.jpg',
      title: 'carousel.slide4.title',
      alt: 'carousel.slide4.alt',
      description: 'carousel.slide4.description',
      link: '/servicios/auditorias',
      height: 'h-[500px] md:h-[550px] lg:h-[calc(100vh-120px)]'
    }
  ];

  preguntas: FAQ[] = [
    {
      id: 1,
      pregunta: '¿Con qué frecuencia es recomendable realizar una auditoría externa?',
      respuesta: 'Recomendamos realizar auditorías externas de forma anual como mínimo, especialmente para empresas medianas y grandes. Sin embargo, el ciclo puede variar según el tamaño, sector y complejidad de la organización. Para pequeñas empresas, una auditoría cada dos años puede ser suficiente si las operaciones son simples.',
      expanded: false
    },
    {
      id: 2,
      pregunta: '¿Qué beneficios aporta una auditoría más allá del cumplimiento legal?',
      respuesta: 'Además del cumplimiento legal, una auditoría proporciona: identificación de ineficiencias operativas, mejora en los controles internos, validación de la confiabilidad de los estados financieros, detección temprana de riesgos, y mejora de la credibilidad ante inversionistas y entidades financieras.',
      expanded: false
    },
    {
      id: 3,
      pregunta: '¿Cuánto tiempo suele durar un proceso de auditoría estándar?',
      respuesta: 'La duración depende del tamaño y complejidad de la empresa. Para una pequeña empresa, puede tomar entre 2 a 4 semanas. Para empresas medianas, entre 4 a 8 semanas. Para corporativos complejos, puede extenderse de 2 a 3 meses. Esto incluye planificación, trabajo de campo y emisión de reportes.',
      expanded: false
    },
    {
      id: 4,
      pregunta: '¿Sus servicios de asesoría están adaptados a pequeñas empresas o solo a corporativos?',
      respuesta: 'En Exactus nos enfocamos en empresas de todos los tamaños. Contamos con servicios diseñados específicamente para pequeñas y medianas empresas (PYMES), adaptando nuestras metodologías y costos según las necesidades y presupuesto de cada cliente. No discriminamos por tamaño, sino por necesidad.',
      expanded: false
    },
    {
      id: 4,
      pregunta: '¿Brindan asesoría contable para MYPES y PYMES en Perú?',
      respuesta: 'En Exactus nos especializamos en empresas de todos los tamaños. Ofrecemos paquetes de outsourcing contable y asesoría tributaria diseñados específicamente para MYPES, adaptando nuestros costos y metodologías al presupuesto de la pequeña y mediana empresa peruana.',
      expanded: false
    },
    {
      id: 6,
      pregunta: '¿Cuentan con software propio para la gestión contable y facturación?',
      respuesta: 'Sí, integramos el ERP ENOVUS en nuestros servicios. Es una herramienta avanzada que facilita el control financiero, la facturación electrónica y el análisis de datos operativos, permitiendo a nuestros clientes cumplir con las normativas de SUNAT de manera automatizada.',
      expanded: false
    },
    {
      id: 7,
      pregunta: '¿Cómo aseguran la confidencialidad de la información financiera y operativa de mi empresa?',
      respuesta: 'La confidencialidad es fundamental para Exactus. Todos nuestros profesionales están bajo estrictos compromisos de confidencialidad contractual y normativas éticas profesionales. Utilizamos sistemas de seguridad de datos de última generación, acceso restringido a información sensible y protocolos de manejo de documentos que cumplen con estándares internacionales.',
      expanded: false
    },
    {
      id: 8,
      pregunta: '¿Asignan un equipo especializado o un consultor fijo para cada proyecto?',
      respuesta: 'Asignamos equipos multidisciplinarios según la naturaleza del proyecto. Cada cliente designa un consultor líder o partner responsable que coordina el trabajo y mantiene comunicación continua. Esto garantiza consistencia, conocimiento acumulado del negocio y una relación de largo plazo con el cliente.',
      expanded: false
    },
    {
      id: 9,
      pregunta: '¿Cómo puedo solicitar una cotización para un servicio específico?',
      respuesta: 'Puede solicitar una cotización de tres formas: (1) A través de nuestro formulario en línea en la sección de contacto, (2) Comunicándose directamente con nuestro equipo comercial, (3) Agendando una consulta inicial gratuita para evaluar sus necesidades. Responderemos en máximo 48 horas.',
      expanded: false
    },
    {
      id: 10,
      pregunta: '¿Qué documentación inicial se requiere para comenzar un diagnóstico de mi empresa?',
      respuesta: 'Para un diagnóstico inicial requerimos: (1) Estados financieros de los últimos 2-3 años, (2) Estructura organizacional y política de la empresa, (3) Listado de procesos clave, (4) Descripción del modelo de negocio, (5) Información sobre sistemas contables y administrativos utilizados. Proporcionamos un checklist detallado al confirmar el proyecto.',
      expanded: false
    }
  ];

  stats = [
    {
      icon: '🏆',
      value: '10+',
      label: 'Años de Experiencia',
      detail: 'Trayectoria sólida en el mercado peruano brindando seguridad jurídica y contable.'
    },
    {
      icon: '🏢',
      value: '150+',
      label: 'Empresas Asesoradas',
      detail: 'Desde MYPES hasta corporativos nacionales confían en nuestra gestión.'
    },
    {
      icon: '✔️',
      value: '100%',
      label: 'Cumplimiento SUNAT',
      detail: 'Cero multas en fiscalizaciones para nuestros clientes con contabilidad externa.'
    },
    {
      icon: '👨‍⚖️',
      value: 'Especialistas',
      label: 'Equipo Colegiado',
      detail: 'Contadores y abogados registrados en sus respectivos colegios profesionales.'
    }
  ];
}
