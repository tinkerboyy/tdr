import { TestBed, inject } from '@angular/core/testing';

import { AlertsService } from './alerts.service';
import {RouterTestingModule} from "@angular/router/testing";

describe('AlertsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [AlertsService]
    });
  });

  it('should be created', inject([AlertsService], (service: AlertsService) => {
    expect(service).toBeTruthy();
  }));
});
