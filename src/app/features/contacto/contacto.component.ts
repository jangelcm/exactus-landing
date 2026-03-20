import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  @ViewChild('nombreInput') nombreInput!: ElementRef<HTMLInputElement>;

  private fb = inject(FormBuilder);

  isSubmitting = false;

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
  isInvalid(controlName: string) {
    const c = this.contactForm.get(controlName);
    return !!(c && c.invalid && (c.touched || c.dirty));
  }

  focusForm() {
    if (this.nombreInput && this.nombreInput.nativeElement) {
      this.nombreInput.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => this.nombreInput.nativeElement.focus(), 600);
    }
  }

  enviarWhatsApp() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const { nombre, empresa, asunto, telefono, mensaje } = this.contactForm.value;
    const nroWhatsApp = '51993652732';

    // Limpiar el teléfono (solo dígitos)
    const telefonoClean = (telefono || '').toString().replace(/\D/g, '');

    const texto = `Hola *Exactus*, mi nombre es *${nombre}*${empresa ? ' de la empresa ' + empresa : ''}.
Mi teléfono es +51 ${telefonoClean}.
Vengo por el asunto: *${asunto}*.
Consulta: ${mensaje}`;

    const url = `https://wa.me/${nroWhatsApp}?text=${encodeURIComponent(texto)}`;

    const win = window.open(url, '_blank');
    if (win) {
      try { win.opener = null; } catch (e) { /* ignore */ }
    }

    this.isSubmitting = false;
  }
}