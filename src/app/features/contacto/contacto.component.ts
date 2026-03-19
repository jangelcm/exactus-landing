import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IconLocationComponent } from '../../shared/components/icons/icon-location.component';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule, ReactiveFormsModule, IconLocationComponent],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  private fb = inject(FormBuilder);

  contactForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    empresa: [''], // Opcional
    asunto: ['', Validators.required],
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    mensaje: ['', [Validators.required]]
  });

  asuntos = [
    'Consulta General',
    'Servicios Contables',
    'Asesoría Tributaria',
    'Constitución de Empresa',
    'Otro'
  ];

  enviarWhatsApp() {
    if (this.contactForm.invalid) return;

    const { nombre, empresa, asunto, telefono, mensaje } = this.contactForm.value;
    const nroWhatsApp = '51993652732';

    // Construcción del cuerpo del mensaje
    const texto = `Hola *Exactus*, mi nombre es *${nombre}*${empresa ? ' de la empresa ' + empresa : ''}.
Mi teléfono es +51 ${telefono}.
Vengo por el asunto: *${asunto}*.
Consulta: ${mensaje}`;

    const url = `https://wa.me/${nroWhatsApp}?text=${encodeURIComponent(texto)}`;

    // Abrir en nueva pestaña
    window.open(url, '_blank');
  }
}