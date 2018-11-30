import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { SinNum } from '../interfaces/sinnum';
import { Unit } from '../interfaces/unit';
import { NonFederalEntities } from '../interfaces/entities';

@Injectable()
export class TableService {
  orders: any[] = [];
  records: any[] = [];
  ordersChanged = new Subject<any[]>();
  recordsChanged = new Subject<any[]>();
  private validations = new Subject<any[]>();
  sinsUpdated = new Subject<SinNum[]>();

  sinClinDataUrl = '/TDR/vendoruser/service/commonservice/sinclindata';
  unitMeasuresUrl = '/TDR/service/commonservice/unitmeasures';
  nonFederalEntititesUrl = '/TDR/service/commonservice/nonfederalentities';

  constructor(private http: HttpClient) {}

  setOrders(orders) {
    this.orders = orders;
    this.ordersChanged.next([...this.orders]);
  }

  setRecords(records = []) {
    this.records = records;
    this.recordsChanged.next([...this.records]);
  }

  deleteOrder(order) {
    this.orders = this.orders.filter(or => or !== order);
    this.ordersChanged.next([...this.orders]);
  }

  getUnitMeasures(): Observable<Unit[]> {
    return this.http
      .get<Unit[]>(this.unitMeasuresUrl)
      .pipe(catchError(error => Observable.of(error)));
  }

  salesTxMapEntities(records = []) {
    const result = _.chain(records)
      .groupBy('orderNbrPiid')
      .map((records, orderId) => {
        return {
          orderId,
          records
        };
      })
      .value();

    return result;
  }

  getSinNums(report): Observable<SinNum[]> {
    let params = new HttpParams()
      .set('contract_id', report.formal_contract)
      .set('contractIndicator', report.contract_indicator)
      .set('reportingPeriod', report.reportingPeriod);

    return this.http
      .get<SinNum[]>(this.sinClinDataUrl, { params })
      .pipe(catchError(error => Observable.of(error)));
  }

  getNonFederalEntities(): Observable<NonFederalEntities[]> {
    return this.http
      .get<any[]>(this.nonFederalEntititesUrl)
      .pipe(catchError(error => Observable.of(error)));
  }

  mapSinDropdown(sins) {
    return sins.map(sin => {
      return {
        label: `${sin.sin_number}`,
        value: `${sin.sin_number}`
      };
    });
  }

  mapNonFederalDropdown(entities) {
    return entities.map(entity => {
      return {
        label: `${entity.code} - ${entity.description}`,
        value: `${entity.code}`
      };
    });
  }

  mapUnitDropdown(units) {
    return units.map(unit => {
      return {
        label: `${unit.unit_abbreviation} - ${unit.unit_description}`,
        value: `${unit.unit_abbreviation}`
      };
    });
  }

  validation() {}

  errorsMessages(record = { orderNbrPiid: '' }) {
    return [
      {
        id: 1,
        description: 'Description of Deliverable'
      },
      {
        id: 2,
        description: 'Unit Measure'
      },
      {
        id: 3,
        description: 'Quantity Sold'
      },
      {
        id: 4,
        description: 'Quantity of Items Sold must be Numeric'
      },
      {
        id: 5,
        description: 'Quantity of Items Sold must be Positive'
      },
      {
        id: 6,
        description: 'UPC must be Numeric'
      },
      {
        id: 7,
        description: 'Unit Price'
      },
      {
        id: 8,
        description: 'Unit Price must be Positive'
      },
      {
        id: 9,
        description: 'UPC must be Numeric'
      },
      {
        id: 10,
        description: `Discount amount cannot be reported for order number  ${
          record.orderNbrPiid
        } where no sales have been reported.`
      },
      {
        id: 11,
        description: 'Total Price'
      },
      {
        id: 12,
        description: 'Total Price must be Numeric'
      },
      {
        id: 13,
        description: 'Total Price must be positive'
      },
      {
        id: 14,
        description: 'you need to have at least one order'
      }
    ];
  }
}
