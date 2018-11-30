import { TestBed, inject, async, getTestBed } from "@angular/core/testing";

import { TableService } from "./table.service";
import {
  HttpClientModule,
  HttpClient,
  HttpEvent,
  HttpEventType
} from "@angular/common/http";
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { Observable } from "rxjs/Observable";
import { HttpParams } from "@angular/common/http";

fdescribe("TableService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [TableService]
    });
  });

  afterEach(
    inject([HttpTestingController], (httpMock: HttpTestingController) => {
      httpMock.verify();
    })
  );

  it(
    "should be created",
    inject([TableService], (service: TableService) => {
      expect(service).toBeTruthy();
    })
  );

  // it(
  //   `should issue a request Unit Measure`,
  //   // 1. declare as async test since the HttpClient works with Observables
  //   async(
  //     // 2. inject HttpClient and HttpTestingController into the test
  //     inject(
  //       [HttpTestingController, TableService],
  //       (httpMock: HttpTestingController, backend: TableService) => {
  //         const mockUnitMeasures = [
  //           { unit_abbreviation: "01", unit_description: "ACTUAL PONDS" },
  //           { unit_abbreviation: "02", unit_description: "STATUTE MILE" }
  //         ];

  //         backend.getUnitMeasures().subscribe((event: HttpEvent<Unit[]>) => {
  //           switch (event.type) {
  //             case HttpEventType.Response:
  //               expect(event.body).toEqual(mockUnitMeasures);
  //               expect(event.body.length).toBeGreaterThan(0);
  //               expect(event.body[0].unit_description).toEqual("ACTUAL PONDS");
  //           }
  //         });

  //         const mockRequest = httpMock.expectOne(backend.unitMeasuresUrl);

  //         expect(mockRequest.cancelled).toBeFalsy();
  //         expect(mockRequest.request.responseType).toEqual("json");

  //         mockRequest.flush(mockUnitMeasures);
  //         httpMock.verify();
  //       }
  //     )
  //   )
  // );

  it(
    "returns Unit Measures",
    inject(
      [HttpTestingController, TableService],
      (httpMock: HttpTestingController, tableService: TableService) => {
        const mockResponse = [
          { unit_abbreviation: "01", unit_description: "ACTUAL PONDS" },
          { unit_abbreviation: "02", unit_description: "STATUTE MILE" }
        ];

        // const tableService = TestBed.get(TableService);

        tableService.getUnitMeasures().subscribe(units => {
          expect(units.length).toBeGreaterThan(0);
          expect(units[0].unit_description).toEqual("ACTUAL PONDS");
        });

        const req = httpMock.expectOne(tableService.unitMeasuresUrl);
        expect(req.request.method).toEqual("GET");
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual("json");

        req.flush(mockResponse);
        httpMock.verify();
      }
    )
  );

  it(
    "should throw with an error message when API returns an error",
    inject(
      [HttpTestingController, TableService],
      (httpMock: HttpTestingController, tableService: TableService) => {
        tableService
          .getUnitMeasures()
          .catch(actualError => {
            expect(Observable.of(actualError)).toBeTruthy();
            expect(actualError).toBeTruthy();
            return Observable.of(actualError);
          })
          .subscribe();

        const req = httpMock.expectOne(tableService.unitMeasuresUrl);
        expect(req.request.method).toEqual("GET");

        req.flush(
          { errorMessage: "Uh oh!" },
          { status: 500, statusText: "Server Error" }
        );
        httpMock.verify();
      }
    )
  );

  xit(
    "returns Sin Nums",
    inject(
      [HttpTestingController, TableService],
      (httpMock: HttpTestingController, backend: TableService) => {
        const mockResponse = [
          {
            end_date: "02/21/2022",
            end_iso_date: "2022-02-21T00:00:00.000-05:00",
            begin_iso_date: "2017-02-22T00:00:00.000-05:00",
            index_number: " ",
            terminated_date: "",
            psc_code: "R799",
            begin_date: "02/22/2017",
            scope: "W",
            control_number: "201705319133",
            sin_number: "874 1",
            active: true
          },
          {
            end_date: "02/21/2022",
            end_iso_date: "2022-02-21T00:00:00.000-05:00",
            begin_iso_date: "2017-02-22T00:00:00.000-05:00",
            index_number: " ",
            terminated_date: "",
            psc_code: "R799",
            begin_date: "02/22/2017",
            scope: "W",
            control_number: "201705319134",
            sin_number: "874 1RC",
            active: true
          }
        ];

        const report = {
          formal_contract: "47QSEA17D001T",
          contract_indicator: "F",
          reportingPeriod: "02-2017"
        };
        let params = new HttpParams()
          .set("contract_id", report.formal_contract)
          .set("contractIndicator", report.contract_indicator)
          .set("reportingPeriod", report.reportingPeriod);

        const tableService = TestBed.get(TableService);

        tableService
          .getSinNums(tableService.sinClinDataUrl, params)
          .subscribe(next => {
            expect(next.length).toBeGreaterThan(0);
            expect(next[0].active).toEqual(true);
          });

        // const req = httpMock.expectOne(
        //   `/TDR/vendoruser/service/commonservice/sinclindata?contract_id=47QSEA17D001T&reportingPeriod=02-2017&contractIndicator=F`
        // );
        // expect(req.request.url).toBe(
        //   `/TDR/vendoruser/service/commonservice/sinclindata`
        // );
        // expect(req.request.method).toEqual("GET");
        // expect(req.cancelled).toBeFalsy();
        // expect(req.request.responseType).toEqual("json");

        // req.flush(mockResponse);
        // httpMock.verify();
      }
    )
  );

  it(
    "returns NON FEDERAL ENTITIES",
    inject(
      [HttpTestingController, TableService],
      (httpMock: HttpTestingController, tableService: TableService) => {
        const mockResponse = [
          { code: "N/A", description: "Not Applicable" },
          { code: "SCP", description: "STLOC Cooperative Purchasing" }
        ];

        // const tableService = TestBed.get(TableService);

        tableService.getNonFederalEntities().subscribe(units => {
          expect(units.length).toBeGreaterThan(0);
          expect(units[0].description).toEqual("Not Applicable");
          expect(units[0].code).toEqual("N/A");
        });

        const req = httpMock.expectOne(tableService.nonFederalEntititesUrl);
        expect(req.request.method).toEqual("GET");
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual("json");

        req.flush(mockResponse);
        httpMock.verify();
      }
    )
  );

  it(
    "should handle error message gracefully when NON FEDERAL ENTITIES API returns an error",
    inject(
      [HttpTestingController, TableService],
      (httpMock: HttpTestingController, tableService: TableService) => {
        tableService
          .getNonFederalEntities()
          .catch(actualError => {
            expect(Observable.of(actualError)).toBeTruthy();
            expect(actualError).toBeTruthy();
            return Observable.of(actualError);
          })
          .subscribe();

        const req = httpMock.expectOne(tableService.nonFederalEntititesUrl);
        expect(req.request.method).toEqual("GET");

        req.flush(
          { errorMessage: "Uh oh!" },
          { status: 500, statusText: "Server Error" }
        );
        httpMock.verify();
      }
    )
  );
});
