import {
  Component,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewChild,
  ViewChildren,
  group
} from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupName,
  Validators
} from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Subject } from 'rxjs/Subject';
import { Contract } from '../../interfaces/contract';
import { Reporting } from '../../interfaces/reporting';
import { SalesTx } from '../../interfaces/sales-tx';
import { Unit } from '../../interfaces/unit';
import { SinNum } from '../../interfaces/sinnum';
import { FormEntryService } from '../../form-entry.service';
import { AlertsService } from '../../../../shared/components/alerts/services/alerts.service';
import { JoinPipe } from '../../../../shared/pipes/join/join.pipe';

import * as fromSales from '../../../store/reducers/sales.reducer';
import * as fromEntryActions from '../../../store/actions/form-entry.action';
import { Router } from '@angular/router';
import { LoadingBarService } from '../../../../shared/components/loading-bar/services/loading-bar.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CdkStepperNext } from '@angular/cdk/stepper';

declare var _: any;

@Component({
  selector: 'app-form-entry',
  templateUrl: './form-entry.component.html',
  styleUrls: ['./form-entry.component.scss'],
  host: { style: 'width:100%' }
})
export class FormEntryComponent implements OnInit, OnDestroy {
  private confirmation = new Subject<boolean>();

  contracts: Contract[];
  contracts$: Observable<Contract[]>;
  reportingData: Reporting;
  salesTxData: SalesTx;
  contract: Contract;
  units: Array<Unit> = [];
  sinClinData: SinNum[] = [];
  sinNums: SinNum[];
  contractNumber: string;
  isLoading: boolean = true;
  isSubmitted: boolean;
  loadingTable: boolean = false;
  submitRecords: any;
  confirmFormEntrySubmit: boolean = false;
  preSubmission: boolean = false;
  private modelRef: BsModalRef;
  isLoading$: Observable<boolean>;
  pageTitle = 'Report Data via Form Entry';
  action: string = '';
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  formEntrySubmitted: boolean = false;

  submitted = new Subject<boolean>();

  defaultOptions: SalesTx = {
    fees_amount: '$0.00',
    total_order_sales: '$0.00',
    zerosale: 'No',
    status: 'NOT REPORTED',
    adjust: false
  };

  @ViewChild('saveFormEntryModal') saveFormEntryModal;
  @ViewChild('submitFormEntryModal') submitFormEntryModal;
  @ViewChild('submitConfirmationModal') submitConfirmationModal;

  constructor(
    private router: Router,
    private formEntryService: FormEntryService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private alertService: AlertsService,
    private joinPipe: JoinPipe,
    private store: Store<fromSales.SalesState>,
    private loadingService: LoadingBarService
  ) {}

  ngOnInit() {
    this.isLoading = true;

    const allContracts = this.store.select(fromSales.getContractsState);
    const errorMessages = this.store.select(fromSales.getErrorState);
    // const reporting = this.store.select(fromSales.getReportingState);

    this.isLoading$ = this.store.select(fromSales.getLoadingState);

    allContracts.subscribe((next: Array<Contract>) => {
      this.contracts$ = Observable.of(next);
      this.contracts = next;
    });

    errorMessages.subscribe(next => {
      if (next) {
        this.loadingService.complete();
        const error = next.error;
        this.alertService.logError(
          `${this.joinPipe.transform(error.failedMessages)}`
        );
      }
    });

    this.fetchAllContracts();

    this.submitted.subscribe((next: boolean) => (this.isSubmitted = next));
  }

  ngOnDestroy(): void {}

  fetchAllContracts() {
    this.store.dispatch(new fromEntryActions.LoadContracts());
  }

  onContractChanged(selected) {
    this.contractNumber = selected;
    this.contract = this.contracts.find(
      (contract: Contract) => contract._id === selected
    );

    // this.store.dispatch(new fromEntryActions.LoadReportingData(selected));
    this.fetchNotReported(selected);
  }

  // Fetch the Reported data
  fetchNotReported(contractNumber: string) {
    this.formEntryService
      .fetchNotReportedPeriod(contractNumber)
      .mergeMap((reporting: Reporting) => {
        if (reporting instanceof HttpErrorResponse) {
          const error = reporting.error;
          this.alertService.logError(
            `${this.joinPipe.transform(error.failedMessages)}`
          );
          this.reportingData = null;
        } else {
          this.reportingData = reporting;
          return this.fetchSalesTx(reporting);
        }
      })
      .subscribe((response: SalesTx) => {
        if (response && response !== null && response.records.length) {
          this.groupByOrderId(response.records);
        }

        if (response && response !== null) {
          this.salesTxData = response;
        } else {
          this.salesTxData = Object.assign({}, this.defaultOptions);
        }
      });
  }

  groupByOrderId(salesData) {
    const orderPiids = salesData.map(x => x.orderNbrPiid);
    const results = Array.from(orderPiids).map(x => ({
      orderId: x,
      records: salesData.filter(o => o.orderNbrPiid === x)
    }));
  }

  // Fetch the sales Tx data;
  fetchSalesTx(reporting) {
    // this.formEntryService
    //   .getSalesTx(reporting)
    //   .subscribe((response: SalesTx) => {
    //     if (response && response !== null && response.records.length) {
    //       this.groupByOrderId(response.records);
    //     }

    //     if (response && response !== null) {
    //       this.salesTxData = response;
    //     } else {
    //       this.salesTxData = Object.assign({}, this.defaultOptions);
    //     }
    //   });
    return this.formEntryService.getSalesTx(reporting);
  }

  saveDetails() {
    return {
      duns: this.reportingData.duns,
      schedule: this.reportingData.schedule,
      closeout: 'No',
      reportingPeriod: this.reportingData.reportingPeriod,
      records: [],
      saveid: '1436379531044',
      savesubmit: 'save',
      zerosale: this.salesTxData.zerosale || 'No',
      contract_id: this.contractNumber,
      adjust: false,
      quarterlyReporting:
        this.reportingData.active_reporting_type === 'QUARTERLY' ? true : false,
      reportingMethod: 'Form Entry'
    };
  }

  onUpdatedRecords({ records, action }) {
    this.submitRecords = { ...this.saveDetails(), records, savesubmit: action };

    if (action === 'save') {
      this.modelRef = this.modalService.show(
        this.saveFormEntryModal,
        this.config
      );
    }

    if (action === 'submit') {
      this.preSubmission = true;
      this.modelRef = this.modalService.show(
        this.submitFormEntryModal,
        this.config
      );
    }
  }

  getTheFeedData(response) {
    const params = {
      contract_id: this.contractNumber,
      reportingPeriod: this.reportingData.reportingPeriod
    };
    return this.formEntryService.getFeedData(params);
  }

  onReportZerosaleStatus(event: { zerosale: string }) {
    this.salesTxData = { ...this.salesTxData, zerosale: event.zerosale };
  }

  closeSaveFormEntryModal() {
    this.modelRef.hide();
  }

  closeSubmitFormEntryModal() {
    this.modelRef.hide();

    if (this.formEntrySubmitted) {
      this.router.navigate(['v2/home']);
    } else {
      this.confirmFormEntrySubmit = false;
      this.modelRef.hide();
    }
  }

  closeActionModal() {
    this.modelRef.hide();
  }

  confirmSubmitFormEntryModal() {
    this.submitted.next(true);
    const params = this.submitRecords;

    this.formEntryService.saveFormEntry(params).subscribe(
      response => {
        this.submitted.next(false);
        this.preSubmission = false;
        this.confirmFormEntrySubmit = false;
        this.formEntrySubmitted = true;
      },
      error => {
        this.submitted.next(false);
        this.preSubmission = false;
        this.confirmFormEntrySubmit = false;
        this.formEntrySubmitted = false;
        this.modelRef.hide();
      }
    );
  }

  confirmSaveFormEntryModal() {
    this.submitted.next(true);
    const params = this.submitRecords;

    this.formEntryService
      .saveFormEntry(params)
      .mergeMap(response => {
        this.submitted.next(false);
        this.alertService.logSuccess('Data entry has been saved', false);
        return this.getTheFeedData(response);
      })
      .subscribe(
        feed => {
          this.salesTxData = feed;
          this.modelRef.hide();
        },
        error => {
          this.submitted.next(false);
          this.modelRef.hide();
        }
      );
  }

  addNewRow(event) {
    const salesTx = {...this.salesTxData};
    salesTx.records.push(event);
    this.salesTxData = salesTx;
  }
}
