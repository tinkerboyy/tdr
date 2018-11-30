import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import {By} from "@angular/platform-browser";
import {MomentModule} from "angular2-moment";
import {AuthService} from "../../auth/services/auth.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {BsModalService, ComponentLoaderFactory, ModalModule, PositioningService} from "ngx-bootstrap";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModalModule, MomentModule, HttpClientModule, HttpClientTestingModule ],
      declarations: [ HeaderComponent ],
      providers: [ AuthService, BsModalService, ComponentLoaderFactory, PositioningService ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a server time', () => {
    component.servertime = '23.04.2014 23:40:50';
    expect(component.servertime).toContain('23.04.2014 23:40:50');
  });

  /*
  it('should render server time', () => {
    const el = fixture.debugElement.query(By.css('.server-time'));
    expect(el).toContain('text');
  });

  it('should have a display name @Input', () => {
    component.displayName = 'Madhukar';
    expect(fixture.debugElement.query(By.css('.dropdown-toggle'))).toContain(
      'MADHUKAR'
    );
  });
  */

  it('should toggle sidenav', () => {
    spyOn(component, 'onToggleSidenav');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    fixture.whenStable().then(() => {
      expect(component.onToggleSidenav).toHaveBeenCalled();
    });
  });

  it('should toggle the menu false -> true', () => {
    component.menuOpened = false;
    component.onToggleSidenav();
    expect(component.menuOpened).toBe(true);
  });

  it('should toggle the menu true -> false', () => {
    component.menuOpened = true;
    component.onToggleSidenav();
    expect(component.menuOpened).toBe(false);
  });

  it('should called the output on a value change', () => {
    spyOn(component.sidenavToggle, 'emit').and.callThrough();
    component.menuOpened = false;
    component.onToggleSidenav();
    expect(component.sidenavToggle.emit).toHaveBeenCalled();
  });
});
