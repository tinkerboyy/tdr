import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {HeaderComponent} from "./navigation/header/header.component";
import {MomentModule} from "angular2-moment";
import {FooterComponent} from "./navigation/footer/footer.component";
import {SideNavComponent} from "./navigation/side-nav/side-nav.component";
import {SharedModule} from "./shared/shared.module";
import {RouterTestingModule} from "@angular/router/testing";
import {Idle, IdleExpiry} from "@ng-idle/core";
import {Keepalive} from "@ng-idle/keepalive";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClientModule} from "@angular/common/http";
import {BsModalService, ComponentLoaderFactory, PositioningService} from "ngx-bootstrap";
import {AuthService} from "./auth/services/auth.service";

describe('AppComponent', function () {
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MomentModule, SharedModule, RouterTestingModule, HttpClientModule, HttpClientTestingModule ],
      declarations: [ HeaderComponent, SideNavComponent, FooterComponent, AppComponent ],
      providers: [ Idle, IdleExpiry, Keepalive, BsModalService, ComponentLoaderFactory, PositioningService, AuthService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
  });


  /*
  it('should create component', () => expect(comp).toBeDefined() );

  it('should have expected <h1> text', () => {
    fixture.detectChanges();
    const h1 = de.nativeElement;
    expect(h1.innerText).toMatch(/angular/i,
      '<h1> should say something about "Angular"');
  });
  */
});
