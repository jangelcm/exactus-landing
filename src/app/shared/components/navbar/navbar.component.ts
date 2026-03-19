import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';


export interface Servicio {
  slug: string;
  key: string;
}

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslocoModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  open = false;
  openServiciosDropdown = false;
  openServiciosDropdownMobile = false;
  currentLang: string = 'es';
  servicios: Servicio[] = [
    { slug: 'asesoria-contable', key: 'accounting' },
    { slug: 'asesoria-tributaria', key: 'tax' },
    { slug: 'asesoria-laboral', key: 'labor' },
    { slug: 'asesoria-juridica', key: 'legal' },
    { slug: 'informes-especiales', key: 'special' },
    { slug: 'auditoria-tributaria', key: 'audit_tax' },
    { slug: 'auditoria-financiera', key: 'audit_financial' }
  ];


  translocoService = inject(TranslocoService);

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
    this.open = false;
    localStorage.setItem('pref_lang', lang);
    this.translocoService.setActiveLang(lang);
  }
}
