import { TestBed, inject, async } from '@angular/core/testing';
import {
  HttpClientModule,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

//import { Observable } from 'rxjs/Observable';
import {Observable} from 'rxjs/Rx';

import { AuthService, Auth } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [AuthService]
    });
  });

  it(
    'should be created',
    inject([AuthService], (service: AuthService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'returns the Server Time',
    inject(
      [HttpTestingController, AuthService],
      (httpMock: HttpTestingController, authService: AuthService) => {
        const mockResponse = { systemdate: 1523479412980 };

        authService.getServerTime().subscribe(next => {
          expect(next).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(Auth.SERVER_TIME);
        expect(req.request.method).toEqual('GET');
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');

        req.flush(mockResponse);
        httpMock.verify();
      }
    )
  );

  it(
    'should throw with an error message when SYSTEM DATE API  returns an error',
    inject(
      [HttpTestingController, AuthService],
      (httpMock: HttpTestingController, authService: AuthService) => {
        authService
          .getServerTime()
          .catch(actualError => {
            expect(Observable.of(actualError)).toBeTruthy();
            expect(actualError).toBeTruthy();
            return Observable.of(actualError);
          })
          .subscribe();

        const req = httpMock.expectOne(Auth.SERVER_TIME);
        expect(req.request.method).toEqual('GET');

        req.flush(
          { errorMessage: 'Uh oh!' },
          { status: 500, statusText: 'Server Error' }
        );
        httpMock.verify();
      }
    )
  );

  it(
    'returns the Display Name',
    inject(
      [HttpTestingController, AuthService],
      (httpMock: HttpTestingController, authService: AuthService) => {
        const mockResponse = 'Madhukar';

        authService.getDisplayName().subscribe(next => {
          expect(next).toEqual('Madhukar');
        });

        const req = httpMock.expectOne(Auth.DISPLAY_NAME);
        expect(req.request.method).toEqual('GET');
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('text');

        req.flush(mockResponse);
        httpMock.verify();
      }
    )
  );

  it(
    'should throw with an error message when DISPLAY NAME API  returns an error',
    inject(
      [HttpTestingController, AuthService],
      (httpMock: HttpTestingController, authService: AuthService) => {
        authService
          .getDisplayName()
          .catch(actualError => {
            expect(Observable.of(actualError)).toBeTruthy();
            expect(actualError).toBeTruthy();
            return Observable.of(actualError);
          })
          .subscribe();

        const req = httpMock.expectOne(Auth.DISPLAY_NAME);
        expect(req.request.method).toEqual('GET');

        req.flush(
          { errorMessage: 'Uh oh!' },
          { status: 500, statusText: 'Server Error' }
        );
        httpMock.verify();
      }
    )
  );

  it(
    'should Logout ',
    inject(
      [HttpTestingController, AuthService],
      (httpMock: HttpTestingController, authService: AuthService) => {
        const mockResponse = 'logout';

        authService.logOut().subscribe(next => {
          expect(next).toEqual('logout');
        });

        const req = httpMock.expectOne(Auth.LOGOUT);
        expect(req.request.method).toEqual('GET');
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('text');

        req.flush(mockResponse);
        httpMock.verify();
      }
    )
  );

  it(
    'should throw with an error message when LOGOUT API  returns an error',
    inject(
      [HttpTestingController, AuthService],
      (httpMock: HttpTestingController, authService: AuthService) => {
        authService
          .logOut()
          .catch(actualError => {
            expect(Observable.of(actualError)).toBeTruthy();
            expect(actualError).toBeTruthy();
            return Observable.of(actualError);
          })
          .subscribe();

        const req = httpMock.expectOne(Auth.LOGOUT);
        expect(req.request.method).toEqual('GET');

        req.flush(
          { errorMessage: 'Uh oh!' },
          { status: 500, statusText: 'Server Error' }
        );
        httpMock.verify();
      }
    )
  );

  it(
    'return App Version ',
    inject(
      [HttpTestingController, AuthService],
      (httpMock: HttpTestingController, authService: AuthService) => {
        const mockResponse = '10.0.3.44.dme.06';

        authService.getAppVersion().subscribe(next => {
          expect(next).toEqual('10.0.3.44.dme.06');
        });

        const req = httpMock.expectOne(Auth.VERSION);
        expect(req.request.method).toEqual('GET');
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('text');

        req.flush(mockResponse);
        httpMock.verify();
      }
    )
  );

  it(
    'should throw with an error message when APP VERSION API  returns an error',
    inject(
      [HttpTestingController, AuthService],
      (httpMock: HttpTestingController, authService: AuthService) => {
        authService
          .getAppVersion()
          .catch(actualError => {
            expect(Observable.of(actualError)).toBeTruthy();
            expect(actualError).toBeTruthy();
            return Observable.of(actualError);
          })
          .subscribe();

        const req = httpMock.expectOne(Auth.VERSION);
        expect(req.request.method).toEqual('GET');

        req.flush(
          { errorMessage: 'Uh oh!' },
          { status: 500, statusText: 'Server Error' }
        );
        httpMock.verify();
      }
    )
  );
});
