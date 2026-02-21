import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
  animations: [
    trigger('fadeInContent', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('800ms 200ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideUpContent', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateY(60px)' }),
        animate(
          '800ms cubic-bezier(0.34, 1.56, 0.64, 1)',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ]),
    trigger('zoomInImage', [
      transition('* => *', [
        style({ opacity: 0, transform: 'scale(1.05)' }),
        animate(
          '1000ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          style({ opacity: 1, transform: 'scale(1)' })
        )
      ])
    ]),
    trigger('scaleInButton', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate('600ms 600ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ])
    ])
  ]
})
export class CarouselComponent {
  @Input() slides: Array<{ image: string; video?: string; title: string; description: string; link?: string, youtube?: string }> = [];
  @Input() autoPlay = true;
  @Input() interval = 6000;
  @Input() showArrows = true;
  @Input() showDots = true;
  @Output() slideChange = new EventEmitter<number>();

  current = 0;
  private timer: any;
  private touchStartX = 0;
  private touchEndX = 0;

  imageLoaded = false;

  isFirstLoad = true;

  ngAfterViewInit() {
    setTimeout(() => {
      this.isFirstLoad = false;
    }, 50);
  }


  ngOnInit() {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  onImageLoad() {
    this.imageLoaded = true;
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }
  startAutoPlay() {
    this.stopAutoPlay();
    this.timer = setInterval(() => this.next(), this.interval);
  }
  stopAutoPlay() {
    if (this.timer) clearInterval(this.timer);
  }
  prev() {
    this.current = (this.current - 1 + this.slides.length) % this.slides.length;
    this.slideChange.emit(this.current);
    if (this.autoPlay) this.startAutoPlay();
  }
  next() {
    this.current = (this.current + 1) % this.slides.length;
    this.slideChange.emit(this.current);
    if (this.autoPlay) this.startAutoPlay();
  }
  goTo(idx: number) {
    this.current = idx;
    this.slideChange.emit(this.current);
    if (this.autoPlay) this.startAutoPlay();
  }
  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.touches[0].clientX;
  }
  onTouchEnd(e: TouchEvent) {
    this.touchEndX = e.changedTouches[0].clientX;
    if (this.touchEndX < this.touchStartX - 40) this.next();
    else if (this.touchEndX > this.touchStartX + 40) this.prev();
  }
}
