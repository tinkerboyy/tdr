import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import { ContractsComponent } from './contractors-landing.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HomeModule} from "../../home.module";
import {RouterTestingModule} from "@angular/router/testing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

describe('ContractsComponent', () => {
  let component: ContractsComponent;
  let fixture: ComponentFixture<ContractsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule, HomeModule, RouterTestingModule, HttpClientModule, HttpClientTestingModule
      ],
      declarations: [ ],
      providers: []
    });
    fixture = TestBed.createComponent(ContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should validate error response',
    inject([HttpClient, HttpTestingController],
      (http: HttpClient, httpTest: HttpTestingController) => {
        const req = httpTest.expectOne({
          url: '/TDR/vendoruser/service/mas-contracts/homepagedata',
          method: 'GET'
        });
        expect(req.request.method).toEqual('GET');
        expect(req.cancelled).toBeFalsy();
        req.flush(null, { status: 401, statusText: 'Unauthorized Exception' });
        httpTest.verify();

        expect(component.isLoading).toEqual(false);
      })
  );

  it('should load vendor contracts using fetchVendorContracts',
    inject([HttpClient, HttpTestingController],
      (http: HttpClient, httpTest: HttpTestingController) => {
        const headerResponse = {
          "monthlyReportingDueDate" : "1530412636334",
          "totalRecords" : 142,
          "quarterlyReportingDueDate" : "1532923200000",
          "iff_paymentDueDate" : "1532923200000"
        };
        const dataResponse = [{
          "reporting_type" : "Monthly",
          "href_pay" : "/TDR/payment.html?key=5ea4c1a16d776218e9db93a0e1eab7f3a5e8007a91fba1fa680a1a43c56a6f993b9f4f525f901f30",
          "href_cid_details" : "/TDR/contract-details.html?key=3d3e482ea0cd8f3d5c98e943a6420422eeb166a190f991899721e8a91c3217431e02d3da6cd29b9f",
          "href_search" : "/TDR/vendor_search.html?key=c75ec803d856250926a1e14d8439f7d964adf3af34a22ded41526e6818d3cbcbc27d369432969fcc",
          "total_out_standing_balance" : 2.62,
          "contract_id" : "GS35F0001V",
          "last_reported" : "1515795817000",
          "total_out_standing_balance_str" : "$2.62",
          "reporting_period_str" : "Jan 2015",
          "last_reported_str" : "01/12/2018 17:23:37",
          "start_reporting_month" : "201501",
          "end_reporting_month" : "201501"
        },
          {
            "reporting_type" : "Quarterly",
            "href_pay" : "/TDR/payment.html?key=e5ef612308970f39ad1d8e539598c78bf1f4851d6051b985de15966194ecf50e3f8e2c6ca654839a",
            "href_cid_details" : "/TDR/contract-details.html?key=487e7006788b0aec19833ef34204395bdcb399c6f467f35a484bcb2e6c60e569979aa3f91db5f797",
            "href_search" : "/TDR/vendor_search.html?key=75ce02ca388a0910c3539bcca2ffcbb51eb70f98d8822f64905f02293ed3abb0d0f5a372f0b44a1e",
            "total_out_standing_balance" : "",
            "contract_id" : "GS35F064PAY",
            "last_reported" : null,
            "total_out_standing_balance_str" : "",
            "reporting_period_str" : null,
            "last_reported_str" : null,
            "start_reporting_month" : null,
            "end_reporting_month" : null
          }];
        const mockResponse =
          {
            "header" : headerResponse,
            "data" : dataResponse};
        const req = httpTest.expectOne({
          url: '/TDR/vendoruser/service/mas-contracts/homepagedata',
          method: 'GET'
        });
        expect(req.request.method).toEqual('GET');
        expect(req.cancelled).toBeFalsy();
        expect(req.request.responseType).toEqual('json');
        req.flush(mockResponse);
        httpTest.verify();

        console.log('Create Delay');
        expect(component.isLoading).toEqual(false);
        //console.log(JSON.stringify(component.contractorsLandingReportingData));
        expect(component.contractorsLandingReportingData).toEqual(headerResponse);
        //console.log(JSON.stringify(component.contractorsLandingReportingData));
        //console.log('Length: ' + component.contractorsLandingDataTable.length);
        //console.log(JSON.stringify(component.contractorsLandingDataTable));
        //expect(component.contractorsLandingDataTable[0].reportingPeriodSort).toEqual(201501);
        //expect(component.contractorsLandingDataTable[0].reportingPeriod).toEqual('201501');
        //expect(component.contractorsLandingDataTable[1].reportingPeriodSort).toEqual('--');
        //expect(component.contractorsLandingDataTable[1].reportingPeriod).toEqual('--');
      })
  );
});
