import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
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
    error: string = '';

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
        this.form = this.fb.group({
            email: [''],
            password: ['']
        });
    }

    login() {
        this.authService.login(this.form.value).subscribe({
            next: () => this.router.navigate(['/']),
            error: () => this.error = 'Credenciales incorrectas'
        });
    }
}
