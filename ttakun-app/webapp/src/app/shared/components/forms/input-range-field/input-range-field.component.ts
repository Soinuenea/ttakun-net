import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-range-field',
  templateUrl: 'input-range-field.component.html',
  styleUrls: ['input-range-field.component.css']
})
export class InputRangeFieldComponent {
  @Input() id: string;
  @Input() controlName: string;
  @Input() key: string;
  @Input() form: FormGroup;
  @Input() class = 'field';
  @Input() minValue: number;
  @Input() maxValue: number;
  @Input() step: number;
  @Input() value: number;

  @ViewChild('range')
  range: ElementRef;

  get sliderStyle() {
    const positionValue = (this.value > this.maxValue) ? this.maxValue : this.value;
    const width = this.range.nativeElement.offsetWidth - 20;
    const newPoint = (positionValue - this.minValue) / (this.maxValue - this.minValue);
    let newPlace;
    let offset = -1.5;

    if (newPoint <= 0) {
      newPlace = width * newPoint;
      offset = 0 - newPoint;
    } else if (newPoint <= 0.5) {
      offset = -1.5;
      newPlace = width * newPoint + offset;
      offset = offset - newPoint;
    } else if (newPoint < 1) {
      offset = -1.5 - (newPoint + 1);
      newPlace = width * newPoint + offset;
    } else {
      offset = -2.5 - (newPoint + 1);
      newPlace = width * newPoint + offset;
    }

    return { 'left.px': `${newPlace + 23}`, 'margin-left.%': `${offset}` }; // eslint-disable-line @typescript-eslint/naming-convention
  }

  get displayValue() {
    const rounded = Math.round(this.value);
    return rounded > this.maxValue ? `+${this.maxValue}` : rounded;
  }
}
