import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appTitle]'
})
export class TitleDirective implements OnInit, AfterViewInit {
  private element: HTMLElement;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.element = this.elementRef.nativeElement;
  }

  ngAfterViewInit() {
    this.checkIfTitle();
  }

  // @HostListener('window:resize')
  checkIfTitle() {
    const isOverflowing = (
      this.element.clientWidth < this.element.scrollWidth - 1
      || this.element.clientHeight < this.element.scrollHeight - 1
    );

    this.element.title = (isOverflowing) ? this.element.innerText : '';
  }


}
