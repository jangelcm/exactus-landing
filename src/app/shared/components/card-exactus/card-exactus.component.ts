import { Component, Input } from '@angular/core';

@Component({
    selector: 'card-exactus',
    templateUrl: './card-exactus.component.html'
})
export class CardExactusComponent {
    @Input() title!: string;
    @Input() description!: string;
    @Input() image!: string;
}
