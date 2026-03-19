import { Component, Input, Output, EventEmitter, PLATFORM_ID, inject, OnInit, OnDestroy, AfterViewInit, NgZone } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink, Scroll } from '@angular/router';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-carousel',
  imports: [CommonModule, RouterLink, AnimateOnScrollDirective, TranslocoModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  @Input() slides: Array<{ image: string; alt: string; video?: string; title: string; description: string; link?: string, youtube?: string, height?: string, width?: string }> = [];
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

  private ngZone = inject(NgZone);

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
    if (!isPlatformBrowser(this.platformId)) return;
    this.stopAutoPlay();

    this.ngZone.runOutsideAngular(() => {
      this.timer = setInterval(() => {
        this.ngZone.run(() => {
          this.next();
        });
      }, this.interval);
    });
  }

  stopAutoPlay() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
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
    if (!isPlatformBrowser(this.platformId)) return;
    this.touchStartX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent) {
    if (!isPlatformBrowser(this.platformId)) return;
    this.touchEndX = e.changedTouches[0].clientX;
    if (this.touchEndX < this.touchStartX - 40) this.next();
    else if (this.touchEndX > this.touchStartX + 40) this.prev();
  }
}