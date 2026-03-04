import { Component, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

export interface Servicio {
  slug: string;
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
  private platformId = inject(PLATFORM_ID);
  open = false;
  openServiciosDropdown = false;
  openServiciosDropdownMobile = false;

  servicios: Servicio[] = [
    { slug: 'asesoria-tributaria', title: 'Asesoría Tributaria', description: 'Cumplimiento tributario integral' },
    { slug: 'asesoria-laboral', title: 'Asesoría Laboral', description: 'Gestión de relaciones laborales' },
    { slug: 'asesoria-juridica', title: 'Asesoría Jurídica', description: 'Servicios legales especializados' },
    { slug: 'informes-especiales', title: 'Informes Especiales', description: 'Informes técnicos y periciales' },
    { slug: 'asesoria-contable', title: 'Asesoria Contable', description: 'Externalización contable profesional' },
    { slug: 'auditoria-tributaria', title: 'Auditoría Tributaria', description: 'Fiscalización tributaria' },
    { slug: 'auditoria-financiera', title: 'Auditoría Financiera', description: 'Auditoría de estados financieros' }
  ];

  constructor(
    private router: Router,
    public authService: AuthService
  ) { }

  navigateToService(slug: string) {
    this.router.navigate(['/servicios', slug]);
    this.open = false;
    this.openServiciosDropdownMobile = false;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  closeDropdowns() {
    this.openServiciosDropdown = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    if (isPlatformBrowser(this.platformId)) {
      window.location.reload();
    }
  }
}
