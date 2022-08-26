import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[scrollTracker]'
})
export class ScrollTrackerDirective {
  @Output() scrollingFinished = new EventEmitter<void>();

  constructor() {}

  @HostListener('scroll', ['$event.target'])
  onScroll(element: HTMLDivElement): void {
    if (element.offsetHeight + element.scrollTop + 0.5 >= element.scrollHeight) {
      this.scrollingFinished.emit();
    }
  }
}
