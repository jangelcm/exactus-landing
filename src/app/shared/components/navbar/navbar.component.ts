import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TopBarComponent } from '../top-bar/top-bar.component';
@Component({
    selector: 'app-navbar',
    imports: [CommonModule, RouterLink, TopBarComponent],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  open = false;
}
