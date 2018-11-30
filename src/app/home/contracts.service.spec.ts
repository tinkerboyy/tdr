import { TestBed, inject } from '@angular/core/testing';

import { ContractsService, Service } from './contracts.service';

import {
  HttpClientModule,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import {RouterTestingModule} from "@angular/router/testing";

describe('ContractsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule, HttpClientTestingModule],
      providers: [ContractsService]
    });
  });

  it(
    'should be created',
    inject([ContractsService], (service: ContractsService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'returns all the Contractors Info',
    inject(
      [HttpTestingController, ContractsService],
      (httpMock: HttpTestingController, contractsService: ContractsService) => {
        const mockResponse = {
            data: [
              {
                contract_id: 'GS35F0001V',
                last_reported: '1515795817000',
                last_reported_str: '01/12/2018 17:23:37',
                reporting_period_str: 'Jan',
                reporting_type: 'Monthly',
                start_reporting_month: '01',
                total_out_standing_balance: 2.62,
                total_out_standing_balance_str: '$2.62'
              }
            ],
            header: {
              iff_paymentDueDate: '1532923200000',
              monthlyReportingDueDate: '1527696991582',
              quarterlyReportingDueDate: '1532923200000',
              totalRecords: 139
            }
          };

        contractsService.getVendorContracts().subscribe(contracts => {
          expect(contracts.data.length).toBeGreaterThan(0);
          expect(contracts.data[0].last_reported).toEqual('1515795817000');
        });

        const req = httpMock.expectOne(Service.URL);
        expect(req.request.method).toEqual('GET');
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');

        req.flush(mockResponse);
        httpMock.verify();
      }
    )
  );
});
