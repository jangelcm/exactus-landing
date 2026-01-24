import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
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
    
    this.successMessage = true;
    this.contactForm.reset();
    this.submitted = false;

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      this.successMessage = false;
    }, 5000);
  }
}
