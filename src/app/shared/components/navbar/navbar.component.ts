import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  open = false;
  openServiciosDropdown = false;
  openServiciosDropdownMobile = false;
  currentLang: string = 'es';
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
  }

  closeDropdowns() {
    this.openServiciosDropdown = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  changeLanguage(lang: string) {
    this.currentLang = lang;
    // Lógica para cambiar el idioma en toda la app:
    // this.translate.use(lang);

    // Opcional: Cerrar menú móvil al cambiar idioma
    this.open = false;

    console.log(`Cambiando idioma a: ${lang}`);
    // Aquí podrías guardar la preferencia en localStorage
    localStorage.setItem('pref_lang', lang);
  }
}
