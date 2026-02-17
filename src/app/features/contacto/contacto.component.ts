import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { environment } from '../../environment/enviroment';
import { IconLocationComponent } from '../../shared/components/icons/icon-location.component';

@Component({
  selector: 'app-contacto',
  imports: [CommonModule, ReactiveFormsModule, IconLocationComponent],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent {
  contactForm: FormGroup;
  submitted = false;
  successMessage = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{10,}$/)]],
      empresa: [''],
      asunto: ['', Validators.required],
      mensaje: ['', [Validators.required, Validators.minLength(9)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.contactForm.invalid) {
      return;
    }

    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', this.contactForm.value);
    emailjs
      .send(
        environment.emailJs.serviceId,
        environment.emailJs.templateId,
        this.contactForm.value,
        environment.emailJs.publicKey
      )
      .then(() => {
        this.successMessage = true;
        this.contactForm.reset();
        this.submitted = false;
        // Ocultar después de 5 segundos
        setTimeout(() => {
          this.successMessage = false;
        }, 4000);
      })
      .catch((error) => {
        console.error('Error al enviar email:', error);
      });

  }
}
