import { Component } from '@angular/core';

@Component({
  selector: 'app-icon-location',
  standalone: true,
  template: `
    <svg class="w-7 h-7 text-[rgb(var(--color-primary))] flex-shrink-0" fill="none" stroke="currentColor"
  stroke-width="2" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round"
    d="M12 21s-6-5.686-6-10a6 6 0 1 1 12 0c0 4.314-6 10-6 10z" />
  <circle cx="12" cy="11" r="2.5" />
</svg>
  `,
  styles: [':host { display: inline-block; color: #3b82f6; /* Tailwind blue-500 */ }']
})
export class IconLocationComponent { }
