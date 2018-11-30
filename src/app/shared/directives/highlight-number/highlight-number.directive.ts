import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightNumber]'
})
// Apply red color to positive number (outstanding balance for example)
export class HighlightNumberDirective implements OnInit {
  @Input() appHighlightNumber: string;
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (Number(this.appHighlightNumber) > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'color', '#d20606');
    }
  }
}
