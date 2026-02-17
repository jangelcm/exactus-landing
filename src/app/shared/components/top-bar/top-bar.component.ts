import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  imports: [CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent {
  phone = '(+51) 993 652 732';
  email = 'admin@exactus.pe';
  address = 'Cal. 02 de Mayo Nro. 516 Int. 201 Lima - Lima - Miraflores';

  socialLinks = [
    { icon: 'facebook', url: '#', label: 'Facebook' },
    { icon: 'linkedin', url: '#', label: 'LinkedIn' },
    { icon: 'youtube', url: '#', label: 'YouTube' },
    { icon: 'whatsapp', url: '#', label: 'WhatsApp' }
  ];

  callPhone() {
    window.location.href = `tel:${this.phone.replace(/\D/g, '')}`;
  }
}
