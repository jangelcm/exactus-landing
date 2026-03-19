import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';
@Component({
    selector: 'app-footer',
    imports: [CommonModule, RouterLink, TranslocoModule],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css']
})
export class FooterComponent {
    email = 'admin@exactus.pe';
}
