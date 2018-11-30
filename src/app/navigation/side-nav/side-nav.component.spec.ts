import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import {SharedModule} from "../../shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {NavigationService} from "../navigation.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule, RouterTestingModule, SharedModule ],
      declarations: [ SideNavComponent ],
      providers: [ NavigationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
