import {TestBed, ComponentFixture} from '@angular/core/testing';
import {Component} from '@angular/core';
import { CollapsePanelDirective } from './collapse-panel.directive';

function getCollapsibleContent(element: HTMLElement): HTMLDivElement {
  return <HTMLDivElement>element.querySelector('.collapse');
}

describe('CollapsePanelDirective', () => {
  it('should create an instance', () => {
    const directive = new CollapsePanelDirective();
    expect(directive).toBeTruthy();
  });
});
