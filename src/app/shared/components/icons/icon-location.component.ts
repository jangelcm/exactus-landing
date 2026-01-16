import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-location',
  standalone: true,
  template: `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7-7.5 11-7.5 11s-7.5-4-7.5-11a7.5 7.5 0 1115 0z" />
    </svg>
  `,
  styles: [':host { display: inline-block; color: #3b82f6; /* Tailwind blue-500 */ }']
})
export class IconLocationComponent {}
