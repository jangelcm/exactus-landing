import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

export interface Servicio {
  title: string;
  description: string;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  open = false;
  openServiciosDropdown = false;
  openServiciosDropdownMobile = false;

  servicios: Servicio[] = [
    { title: 'Asesoría Tributaria', description: 'Cumplimiento tributario integral' },
    { title: 'Asesoría Laboral', description: 'Gestión de relaciones laborales' },
    { title: 'Asesoría Jurídica', description: 'Servicios legales especializados' },
    { title: 'Informes Especiales', description: 'Informes técnicos y periciales' },
    { title: 'Outsourcing Contable', description: 'Externalización contable profesional' },
    { title: 'Auditoría Tributaria', description: 'Fiscalización tributaria' },
    { title: 'Auditoría Financiera', description: 'Auditoría de estados financieros' }
  ];

  constructor(private router: Router) { }

  navigateToService(index: number) {
    this.router.navigate(['/servicios'], { queryParams: { service: index } });
    this.open = false;
    this.openServiciosDropdownMobile = false;
    window.scrollTo(0, 0);
  }

  closeDropdowns() {
    this.openServiciosDropdown = false;
  }
}
