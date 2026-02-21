import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { AlertService } from '../../shared/services/alert.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
    form: FormGroup;
    loading: boolean = false;
    error: string = '';

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router
    ) {
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    login(): void {
        if (this.form.invalid) {
            this.error = 'Por favor completa todos los campos correctamente';
            return;
        }

        this.loading = true;
        this.error = '';

        this.authService.login(this.form.value).subscribe({
            next: () => {
                this.alertService.success('Éxito', 'Sesión iniciada correctamente');
                this.router.navigate(['/admin/dashboard']);
            },
            error: (err) => {
                this.loading = false;
                this.error = err.error?.message || 'Credenciales incorrectas';
                this.alertService.error('Error', this.error);
            }
        });
    }

    logout(): void {
        this.authService.logout();
        this.router.navigate(['/']);
    }
}

