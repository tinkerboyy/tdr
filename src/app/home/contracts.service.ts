import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export enum Service {
  URL = '/TDR/vendoruser/service/mas-contracts/homepagedata'
}

@Injectable()
export class ContractsService {
  constructor(private http: HttpClient) {}
  // Get landing page data from api
  getVendorContracts(): Observable<any> {
    return this.http
      .get(Service.URL);
  }
}
