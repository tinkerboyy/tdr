import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';

import * as _ from 'lodash';
import { Contract } from './interfaces/contract';
import { Reporting } from './interfaces/reporting';
import { SalesTx } from './interfaces/sales-tx';
import { SinNum } from './interfaces/sinnum';
import { map } from 'rxjs/operator/map';
import { of } from 'rxjs/observable/of';

export enum URL {
  CONTRACT = '/TDR/vendoruser/service/mas-contracts/fetcheligblecontractnosforui',
  REPORT_PERIOD = '/TDR/vendoruser/service/commonservice/notreportedperiodwithcontract',
  SALES_TX = '/TDR/vendoruser/service/commonservice/salestx',
  UNIT_MEASURE = '/TDR/service/commonservice/unitmeasures',
  SINCLI = '/TDR/vendoruser/service/commonservice/sinclindata',
  SAVE_ENTRIES = '/TDR/vendoruser/service/uientry/submitentries',
  FEED_DATA = '/TDR/vendoruser/service/commonservice/feedata'
}

@Injectable()
export class FormEntryService {
  private availableContracts: Array<Contract>;
  selectedContract: Contract;
  reportingData: Reporting;
  salesTx: SalesTx;
  sinsNums: Array<SinNum>;

  constructor(private http: HttpClient) {}

  fetchVendorContracts(): Observable<Contract[]> {
    return this.http.get<Contract[]>(URL.CONTRACT);
  }

  fetchNotReportedPeriod(selectedContract): Observable<Reporting> {
    const params = new HttpParams().set('contract', selectedContract);

    return this.http
      .get<Reporting>(URL.REPORT_PERIOD, { params })
      .pipe(catchError(error => Observable.of(error)));
  }

  getFeedData(params) {
    const { contract_id, reportingPeriod } = params;

    let setparams = new HttpParams()
      .set('contract_id', contract_id)
      .set('status', 'false')
      .set('inprogress', 'yes')
      .set('reportingPeriod', reportingPeriod);

    return this.http
      .get(URL.FEED_DATA, { params: setparams })
      .pipe(catchError(error => Observable.of(error)));
  }

  getSalesTx(reporting: Reporting): Observable<SalesTx> {
    const { formal_contract, reportingPeriod } = reporting;

    let params = new HttpParams()
      .set('contract_id', formal_contract)
      .set('status', 'no')
      .set('reportingPeriod', reportingPeriod)
      .set('inprogress', 'yes');

    return this.http.get<SalesTx>(URL.SALES_TX, {
      params
    });
  }

  saveFormEntry<T>(payload): Observable<any> {
    return this.http
      .post(URL.SAVE_ENTRIES, payload, { responseType: 'text' })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  mapContractDropdown(contracts) {
    return contracts.map(contract => {
      return {
        label: contract['formal_contract'],
        value: contract['formal_contract']
      };
    });
  }

  // custom errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      return of(result as T);
    };
  }
}
