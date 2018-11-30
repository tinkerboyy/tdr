import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  TemplateRef,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ElementRef,
  AfterViewInit,
  AfterContentInit,
  NgZone,
  Renderer
} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Validators, FormBuilder } from '@angular/forms';

import * as _ from 'lodash';

import { AlertsService } from '../alerts/services/alerts.service';
import { TableService } from './services/table.service';
import { Observable } from 'rxjs/Rx';
import { Dropdown, DTCheckbox } from 'primeng/primeng';
import { Reporting } from './interfaces/reporting';
import { SalesTx } from './interfaces/sales-tx';
import { SinNum } from './interfaces/sinnum';
import { Unit } from './interfaces/unit';
import { Contract } from './interfaces/contract';

import { NonFederalEntities } from './interfaces/entities';
import { JoinPipe } from '../../pipes/join/join.pipe';
import { FormatListPipe } from '../../pipes/format-list/format-list.pipe';

enum SalesConstants {
  YES = 'Yes',
  NO = 'No'
}

@Component({
  selector: 'app-sales-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sales-table.component.html',
  styleUrls: ['./sales-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SalesTableComponent
  implements OnInit, AfterViewInit, AfterContentInit {
  private modelRef: BsModalRef;
  private _selectedIndex: any;
  reportContract: Reporting;
  salesTxData: SalesTx;
  sinClinData: SinNum[] = [];
  nonFederalEntities: Array<{ label: string; value: string }>;
  entities: Array<any>;
  units: Unit[];
  unitMeasures: Array<Unit>;
  sinCli: SinNum[];
  sinCliList: Array<SinNum>;
  visibleTable: number = 0;
  orders: any[] = [];
  records: any[] = [];
  errors: Array<any>;
  toggleAll: boolean = false;
  toggle: any = [];
  discounts = {
    discountExist: false,
    otherSalesExist: false
  };
  focus: number;
  isShowingFocus: boolean = false;

  numbers: Array<number> = _.range(12);

  @Input() reporting: Reporting;
  @Input() salesTx: SalesTx;
  @Input() contract: Contract;
  @Input() loading: boolean;

  @Output() updateRecords = new EventEmitter<any>();
  @Output() addLineItem = new EventEmitter<any>();

  defaultOptions: SalesTx = {
    fees_amount: '$0.00',
    total_order_sales: '$0.00',
    zerosale: 'No',
    status: 'NOT REPORTED',
    adjust: false
  };

  addOrderForm = this.fb.group({
    orderId: ['']
  });

  constructor(
    private modalService: BsModalService,
    private tableService: TableService,
    private fb: FormBuilder,
    private alertService: AlertsService,
    private joinPipe: JoinPipe,
    private formatPipe: FormatListPipe,
    private elem: ElementRef,
    private ngZone: NgZone,
    private renderer: Renderer
  ) {}

  ngOnInit() {
    this.tableService.ordersChanged.subscribe(or => (this.orders = or));

    this.tableService.getUnitMeasures().subscribe(
      (units: Unit[]) => {
        const unitMeasure = this.tableService.mapUnitDropdown(units);
        this.unitMeasures = unitMeasure;
        this.units = units;
      },
      error => {
        console.log(error);
      }
    );

    this.tableService
      .getNonFederalEntities()
      .subscribe((entities: Array<NonFederalEntities>) => {
        this.entities = entities;
        this.nonFederalEntities = this.tableService.mapNonFederalDropdown(
          entities
        );
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.

    if (changes.reporting) {
      this.reportContract = Object.assign({}, changes.reporting.currentValue);
      if (this.reportContract && this.reportContract.formal_contract)
        this.tableService.getSinNums(this.reportContract).subscribe(sinNums => {
          this.sinClinData = [...sinNums];
          this.records = [...sinNums];
          const sinCli = this.tableService.mapSinDropdown(sinNums);
          this.sinCli = sinNums;
          this.sinCliList = sinCli;
        });
    }

    if (changes.salesTx) {
      this.salesTxData = Object.assign({}, changes.salesTx.currentValue);

      if (this.reportContract.active_reporting_type === 'QUARTERLY') {
        if (this.salesTxData && this.salesTxData['records']) {
          this.records = [...this.salesTxData['records']];
        } else {
          this.records = [...this.reportContract.sins];
        }
        this.tableService.setOrders([]);
      } else {
        const { zerosale } = this.salesTxData;

        if (zerosale === SalesConstants.YES) {
          this.salesTxData = { ...this.salesTxData, records: [] };
          this.tableService.setOrders([]);
        } else {
          const value = this.salesTxData;
          const { records } = value;

          const results = this.tableService.salesTxMapEntities(
            this.salesTxData.records
          );
          this.tableService.setOrders(results);
        }
      }
    }
  }

  ngAfterViewInit() {
    this.fixTablePaginationAccessibility();
    setTimeout(() => {
      const dropdownHiddenInput = this.elem.nativeElement.querySelectorAll(
        '.contractDetails'
      );
    }, 5000);
  }

  ngAfterContentInit() {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    // const dtable = this.elem.nativeElement.querySelectorAll(
    //   '.ui-table-wrapper table'
    // );
    // // add table summery for screen readers
    // dtable[0].setAttribute('summary', 'Testing Table');
  }

  set openTable(index: number) {
    this.visibleTable = index;
    if (~index) {
      console.log(~index);
    }
  }

  get openTable() {
    return this.visibleTable;
  }

  fixTablePaginationAccessibility(): void {
    // 508 fix for pagination icons labels
    setTimeout(() => {
      const dtPaginator = this.elem.nativeElement.querySelectorAll(
        '.ui-paginator'
      );
      for (var i = 0; i < dtPaginator.length; i++) {
        const paginatorFirst = this.elem.nativeElement.querySelectorAll(
          '.ui-paginator-first'
        );
        const paginatorPrev = this.elem.nativeElement.querySelectorAll(
          '.ui-paginator-prev'
        );
        const paginatorNext = this.elem.nativeElement.querySelectorAll(
          '.ui-paginator-next'
        );
        const paginatorLast = this.elem.nativeElement.querySelectorAll(
          '.ui-paginator-last'
        );
        const paginatorDropdownMenu = this.elem.nativeElement.querySelectorAll(
          'ul.ui-dropdown-items'
        );
        const paginatorDropdownMenuItems = this.elem.nativeElement.querySelectorAll(
          'ul.ui-dropdown-items li'
        );
        const dropdownHiddenInput = this.elem.nativeElement.querySelectorAll(
          '.ui-dropdown .ui-helper-hidden-accessible input'
        );

        if (paginatorFirst && paginatorFirst.length > 0) {
          paginatorFirst[i].setAttribute('aria-label', 'Paginator First');
          paginatorFirst[i].setAttribute(
            'id',
            'paginator-' + (i + 1) + '-first'
          );
          paginatorPrev[i].setAttribute('aria-label', 'Paginator Previous');
          paginatorPrev[i].setAttribute(
            'id',
            'paginator-' + (i + 1) + '-previous'
          );
          paginatorNext[i].setAttribute('aria-label', 'Paginator Next');
          paginatorNext[i].setAttribute('id', 'paginator-' + (i + 1) + '-next');
          paginatorLast[i].setAttribute('aria-label', 'Paginator Last');
          paginatorLast[i].setAttribute('id', 'paginator-' + (i + 1) + '-last');
          paginatorDropdownMenu[i].setAttribute('role', 'menu');
          for (var j = 0; j < paginatorDropdownMenuItems.length; j++) {
            paginatorDropdownMenuItems[j].setAttribute('role', 'menuitem');
          }
          dropdownHiddenInput[i].removeAttribute('role');
        }
      }
    });
  }

  // I define which field in should be focused.
  setFocus(fieldToFocus): void {
    this.focus = fieldToFocus;
  }

  toggleTable(index: number) {
    if (this.openTable === index) {
      this.openTable = -1;
      return;
    }

    this.openTable = index;
  }

  set selectedIndex(selected) {
    this._selectedIndex = selected;
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  clearFilter(dropdown: Dropdown) {
    dropdown.resetFilter();
  }

  // calculate monthly total sales
  calculateMonthly(records): number {
    const price = records.reduce(
      (prev, next) =>
        prev + parseInt(next.quatitySold) * parseInt(next.pricePerUnit),
      0
    );
    return isNaN(price) ? 0 : price;
  }

  // calculate total Monthly sales
  calculateMonthlyTotalSales(orders: any[]) {
    let total: number,
      records = [];

    if (orders) {
      this.orders.forEach(order => {
        order.records.forEach(record => records.push(record));
      });

      Observable.from(records)
        .map(record => parseInt(record.totalPrice))
        .reduce((prev, next) => prev + next, 0)
        .subscribe(next => (total = isNaN(next) ? 0 : next));

      return total;
    }
  }

  calculatePrice(record) {
    let total: number;

    Observable.of(record)
      .map(
        (record: { quatitySold: string; pricePerUnit: string }) =>
          parseInt(record.quatitySold) * parseInt(record.pricePerUnit)
      )
      .reduce((prev, next) => prev + next, 0)
      .subscribe(next => (total = isNaN(next) ? 0 : next));
    record.totalPrice = total.toString();
    return total;
    // const price = record.quatitySold * record.pricePerUnit;
    // record.totalPrice = price.toString();
    // return price;
  }

  // calculate total quarterly sales
  calculateQuaterlyTotalSales(values: Array<any>) {
    if (values) {
      const total = values.reduce(
        (prev, next) => prev + parseInt(next.totalPrice),
        0
      );
      return isNaN(total) ? 0 : total;
    }
  }

  //add new order
  addOrder({ value, valid }: { value: any; valid: boolean }) {
    const acceptedPiidregex = new RegExp('^[a-zA-Z0-9. /()_-]+$');
    if (!value.orderId || value.orderId === '') {
      this.alertService.logError('Please enter/select order number first.');
    } else if (!acceptedPiidregex.test(value.orderId)) {
      this.alertService.logError(
        'Order Number accepts only the following special characters:<br />Blank spaces<br />Hyphen<br />Forward slash "/"<br />Period "."<br />Parentheses "(" ")"<br />and Underscore (_)'
      );
    } else if (this.orderExists(value.orderId)) {
      this.alertService.logError(
        `Order number ${value.orderId} already exists`
      );
    } else {
      this.addNewOrder(value);
    }

    this.addOrderForm.reset({
      orderId: ''
    });
  }
  // check orderId already exists
  orderExists(orderId) {
    //return this.orders.map(or => orderId.trim() === or.orderId);
    return this.orders.some(or => orderId.trim() === or.orderId);
  }

  //add a new order with default lineitem
  addNewOrder(value) {
    const order = {
      orderId: value.orderId,
      records: [this.initLineItem(value)]
    };
    const changedOrder = [...this.orders, order];
    this.tableService.setOrders(changedOrder);

    // to focus on the first <input> of the newly added table
    setTimeout(() => {
      this.fixTablePaginationAccessibility();
      let focusElement: HTMLTableElement = document.querySelector(
        `#sales-table-${value.orderId} .ui-table-scrollable-body-table`
      ) as HTMLTableElement;
      let firstRow: HTMLTableRowElement = focusElement.rows[0];
      let focusCell: HTMLTableCellElement = firstRow.cells[1];
      focusCell.click();
      //this.renderer.selectRootElement(focusCell).click();
    });
  }

  //add new lineitem
  addNewLine(order, dt) {
    this.alertService.clear();
    const { records } = order;
    const lastRow = _.last(records);
    const errors = this.validateOrders();
    const errorMap = _.map(errors, 'description');

    if (errors.length) {
      // const display = this.joinPipe.transform(errorMap);
      const display = this.formatPipe.transform(errorMap);

      this.alertService.logError(
        `Please report data for all required fields marked by * and/or fix the data for the following fields:\n ${display}`
      );
      return;
    }
    const newItem = this.initLineItem(order);
    console.log(newItem);
    this.addLineItem.emit(newItem);
    //order.records.push(newItem);

    // to focus on the first <input> of the newly added row
    setTimeout(() => {
      let focusElement: HTMLTableElement = document.querySelector(
        `#sales-table-${order.orderId} .ui-table-scrollable-body-table`
      ) as HTMLTableElement;
      let lastRow: HTMLTableRowElement =
        focusElement.rows[focusElement.rows.length - 1];
      let focusCell: HTMLTableCellElement = lastRow.cells[1];
      focusCell.click();
    });
  }
  // validate errors
  validateOrders() {
    let arr: Array<number> = [];

    if (
      this.reportContract.active_reporting_type === 'MONTHLY' &&
      this.orders.length === 0
    ) {
      this.errors = this.tableService.errorsMessages();
      if (this.salesTxData.zerosale === SalesConstants.NO) arr.push(14);
    }

    if (
      this.reportContract.active_reporting_type === 'MONTHLY' &&
      this.orders.length
    ) {
      this.orders.forEach(order => {
        order.records.forEach(record => {
          const quantitySold = Number(record.quatitySold);
          const upc = Number(record.quatitySold);
          const pricePerUnit = Number(record.pricePerUnit);

          this.errors = this.tableService.errorsMessages(record);

          if (record.descDeliverable === '') arr.push(1);
          if (record.unitMeasure === '') arr.push(2);
          if (record.quatitySold === '') arr.push(3);
          if (isNaN(quantitySold)) arr.push(4);
          if (!this.checkUnitMeasure(record.unitMeasure) && quantitySold < 0)
            arr.push(5);
          if (isNaN(upc)) arr.push(6);
          if (record.pricePerUnit === '') arr.push(7);
          if (isNaN(pricePerUnit)) arr.push(8);
          if (!isNaN(pricePerUnit) && pricePerUnit < 0) arr.push(9);
          if (record.unitMeasure === 'PPD' || record.unitMeasure === 'VD') {
            this.discounts = { ...this.discounts, discountExist: true };
          } else {
            this.discounts = { ...this.discounts, otherSalesExist: true };
          }
        });
      });
    }

    if (this.reportContract.active_reporting_type === 'QUARTERLY') {
      this.records.forEach(record => {
        this.errors = this.tableService.errorsMessages(record);
        const price = record.totalPrice ? record.totalPrice : '';
        const totalPrice = price.length ? Number(price) : price;

        if (totalPrice === '') arr.push(11);
        if (!isNaN(totalPrice) && totalPrice < 0) arr.push(12);
        if (isNaN(totalPrice)) arr.push(13);
      });
    }

    const sortedArr = _.sortedUniq(arr);
    const errorsList = _.filter(
      this.errors,
      v => _.indexOf(sortedArr, v.id) >= 0
    );

    return errorsList;
  }

  checkUnitMeasure(unit) {
    const arr = ['PPD', 'VD', 'RTN'];
    return arr.some(x => x === unit);
  }

  deleteLineDialog(order, index: number, template: TemplateRef<any>) {
    this.selectedIndex = { order, index };
    this.modelRef = this.modalService.show(template);
  }

  deleteLineItem() {
    const { order, index } = this.selectedIndex;
    order.records.splice(index, 1);
    this.modelRef.hide();
    // order.records.filter((item, i) => i !== index);
    // console.log(order)
  }

  closeDeleteRowModal(result) {
    this.modelRef.hide();
  }

  deleteRowFromOrder(result) {
    this.deleteLineItem();
  }

  deleteOrderDialog(index, template: TemplateRef<any>) {
    this.selectedIndex = index;
    this.modelRef = this.modalService.show(template);
    //this.orders.splice(index, 1);
    // this.orders = [...this.orders.filter((item, i) => i !== index)];
  }

  closeDeleteOrderModal() {
    this.modelRef.hide();
  }

  // accessibility to fix first input in the table
  onFocusField(element) {
    element.target.click();
  }

  deleteOrderTable() {
    const index = this.selectedIndex;
    // const changedOrder = [...this.orders.filter((item, i) => i !== index)
    this.tableService.deleteOrder(index);
    this.modelRef.hide();
  }

  showSaveModal(action) {
    let errors: Array<any> = [];
    const { discountExist, otherSalesExist } = this.discounts;
    this.alertService.clear();

    errors = this.validateOrders();

    if (errors.length) {
      const errorMap = _.map(errors, 'description');
      const display = this.formatPipe.transform(errorMap);
      if (this.reportContract.active_reporting_type === 'QUARTERLY') {
        this.alertService.logError(
          `Please report data for all required fields marked by * and/or fix the data for the following fields:\n ${display}`
        );
        return;
      }

      if (this.reportContract.active_reporting_type === 'MONTHLY') {
        this.alertService.logError(
          `Please report data for all required fields marked by * and/or fix the data for the following fields:\n ${display}`
        );
        return;
      }
    }

    if (discountExist && !otherSalesExist) {
      const message = this.errors.find(x => x.id === 10);
      this.alertService.logError(`${message.description}`);
      return;
    }

    this.confirmSave(action);
  }

  confirmSave(action) {
    let data = [];
    if (this.reportContract.active_reporting_type === 'QUARTERLY') {
      this.updateRecords.emit({ records: this.records, action: action });
    } else {
      this.orders.forEach(order => {
        order.records.forEach(record => data.push(record));
      });
      this.updateRecords.emit({ records: data, action: action });
    }
    // this.modelRef.hide();
  }

  contractLoadedAndNonCloseout(): boolean {
    return this.contract &&
      this.reportContract &&
      !this.contract.closeoutEligible &&
      this.reportContract.active_reporting_type !== 'QUARTERLY'
      ? true
      : false;
  }

  showContractDetails(): boolean {
    if (
      this.contract &&
      this.reportContract &&
      this.contract.formal_contract &&
      this.reportContract.schedule
    ) {
      return true;
    }
    return false;
  }

  isMonthlyContractAndSelectedOrder(): boolean {
    return this.contract &&
      this.contract.formal_contract &&
      this.reportContract &&
      this.reportContract.active_reporting_type === 'MONTHLY' &&
      this.orders &&
      this.orders.length
      ? true
      : false;
  }

  isNonMasContract() {
    return this.contract &&
      this.contract.contract_type === 'NONMAS' &&
      this.reportContract &&
      this.reportContract.taskOrders
      ? true
      : false;
  }

  public showSaveControls = () => {
    if (this.orders || this.salesTxData.zerosale === 'Yes') {
      return true;
    }
    return false;
  };

  toggleTablesDisplay() {
    this.toggleAll = !this.toggleAll;
    this.orders.forEach(
      (order, i) => (this.toggle[i] = this.toggleAll ? true : false)
    );
  }

  initLineItem({ orderId }) {
    return {
      descDeliverable: '',
      name: '',
      openMarket: 'no',
      contract_id: this.contract.formal_contract || '',
      partNumber: '',
      upc: '',
      sin_number: '',
      unitMeasure: '',
      quatitySold: '',
      pricePerUnit: '',
      totalPrice: '',
      nonGovEntity: 'N/A',
      orderNbrPiid: orderId || ''
    };
  }

  // return the unit measure description placeholder
  getUnitMeasure(unitCode: string): any {
    const { unit_abbreviation, unit_description } = this.units.find(
      (unit: Unit) => unit.unit_abbreviation === unitCode
    );
    return `${unit_abbreviation} - ${unit_description}`;
  }

  // return the federal description placeholder
  getEntityDescription(entity) {
    const { code, description } = this.entities.find(
      (en: { code: string; description: string }) => en.code === entity
    );
    return `${code} - ${description}`;
  }

  // return the amount is a number or a string to conver it to currency
  transformCurrency(price) {
    const parsePrice = parseInt(price);
    if (isNaN(parsePrice)) {
      return;
    }
    return true;
  }
}
