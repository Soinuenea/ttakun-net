import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appIntegerInput]'
})
export class IntegerInputDirective {
  private regex = new RegExp(/^\d+$/g);
  private specialKeys: string[] = [ 'Backspace', 'Tab', 'End', 'Home', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'  ];

  constructor(
    private el: ElementRef
  ) { }

  @HostListener('keydown', [ '$event' ])
  onKeyDown(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) !== -1) {
      return;
    }

    const current: string = this.el.nativeElement.value;
    const next: string = current.concat(event.key);
    if (next && !String(next).match(this.regex)) {
      event.preventDefault();
    }
  }
}
