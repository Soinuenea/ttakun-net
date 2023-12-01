import { AfterViewInit, Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollHere]'
})
export class ScrollHereDirective implements OnInit, AfterViewInit {
  private element: HTMLElement;
  @Input() appScrollHere: boolean;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement;
  }

  ngAfterViewInit() {
    if (this.appScrollHere) {
      this.element.scrollIntoView();
    }
  }
}
