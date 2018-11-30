import { Input } from '@angular/core';
import {
  Directive,
  ElementRef,
  HostListener,
  HostBinding
} from '@angular/core';

@Directive({
  selector: '[customErrors]'
})
export class ErrorsDirective {
  constructor(private element: ElementRef) {}

  @HostBinding('style.border') border: string;

  @HostListener('input', ['$event'])
  onkeydown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    let trimmed = input.value.replace(/\s+/g, '');

    this.border = '';

    // if (/[^\d]+/.test(trimmed)) {
    //   this.border = '5px solid red';
    // }

    if (trimmed === '') this.border = '5px solid #e32c28';
  }

  @Input()
  set customErrors(model) {
    const { field, value } = model;
    this.border = '';

    // if (field === '') {
    //   this.border = '1px solid red';
    //   this.element.nativeElement.style.border = '1px solid #e32c28';
    // }

    switch (field) {
      case 'pricePerUnit':
        const parsedPrice = Number(value);
        if (
          value === '' ||
          isNaN(parsedPrice) ||
          (!isNaN(parsedPrice) && parsedPrice < 0)
        ) {
          this.border = '1px solid red';
          this.element.nativeElement.style.border = '1px solid #e32c28';
        }
        break;

      case 'quatitySold':
        const parseQuantity = Number(value);
        if (value === '' || isNaN(parseQuantity)) {
          this.border = '1px solid red';
          this.element.nativeElement.style.border = '1px solid #e32c28';
        }
        break;

      case 'deliverable':
        if (value === '') {
          this.border = '1px solid red';
          this.element.nativeElement.style.border = '1px solid #e32c28';
        }
        break;

      case 'unitMeasure':
        if (value === '') {
          this.border = '1px solid red';
          this.element.nativeElement.style.border = '1px solid #e32c28';
        }
        break;

      default:
        this.border = '';
    }
  }
}
