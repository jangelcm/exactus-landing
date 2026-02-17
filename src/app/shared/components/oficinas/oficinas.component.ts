import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconLocationComponent } from '../icons/icon-location.component';

@Component({
    selector: 'app-oficinas',
    imports: [CommonModule, IconLocationComponent],
    templateUrl: './oficinas.component.html',
    styleUrls: ['./oficinas.component.css']
})
export class OficinasComponent {
    address = 'admin@exactus.pe';
}
