import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportingInfoComponent } from './reporting-info.component';
import {ReportingData} from "../../interfaces/reporting-data";

describe('ReportingInfoComponent', () => {
  let component: ReportingInfoComponent;
  let fixture: ComponentFixture<ReportingInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportingInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportingInfoComponent);
    component = fixture.componentInstance;
    let inputData: ReportingData = {};
    inputData.totalRecords = 100;
    inputData.iff_paymentDueDate = '01/01/2017';
    inputData.monthlyReportingDueDate = '01/10/2018';
    inputData.quarterlyReportingDueDate = '03/31/2018';
    component.contracts = inputData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Validate Input Data', () => {
    expect(component.reportingData.totalRecords).toEqual(100);
    expect(component.reportingData.iff_paymentDueDate).toEqual('01/01/2017');
    expect(component.reportingData.monthlyReportingDueDate).toEqual('01/10/2018');
    expect(component.reportingData.quarterlyReportingDueDate).toEqual('03/31/2018');
  });
});
