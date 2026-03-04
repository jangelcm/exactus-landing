import { Component, Input, Output, EventEmitter, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, RouterLink],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  private platformId = inject(PLATFORM_ID);
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
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.isFirstLoad = false;
      }, 50);
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId) && this.autoPlay) {
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
