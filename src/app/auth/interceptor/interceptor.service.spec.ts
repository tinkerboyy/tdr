import { TestBed, inject } from '@angular/core/testing';

import { InterceptorService } from './interceptor.service';
import {RouterTestingModule} from "@angular/router/testing";

describe('InterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [InterceptorService]
    });
  });

  it('should be created', inject([InterceptorService], (service: InterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
