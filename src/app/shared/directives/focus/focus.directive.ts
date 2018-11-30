import { Renderer2 } from '@angular/core';
import {
  Directive,
  Input,
  EventEmitter,
  Inject,
  ElementRef,
  Renderer,
  OnInit
} from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective implements OnInit {

  constructor(
    @Inject(ElementRef) private element: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.element.nativeElement.click();
  }
}
