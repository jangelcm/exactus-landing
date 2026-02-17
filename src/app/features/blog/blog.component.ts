import { Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../../core/services/blog.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-blog',
    templateUrl: './blog.component.html',
    styleUrls: ['./blog.component.css'],
    imports: [CommonModule, RouterLink],
})
export class BlogComponent {

    @Input() blog: any = {};
    constructor() { }

}
