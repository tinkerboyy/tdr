import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  TemplateRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormBuilder } from '@angular/forms';
import { FormEntryService } from '../../form-entry.service';
import { AlertsService } from '../../../../shared/components/alerts/services/alerts.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Contract } from '../../interfaces/contract';
import { Reporting } from '../../interfaces/reporting';
import { SalesTx } from '../../interfaces/sales-tx';
import { Unit } from '../../interfaces/unit';
import { SinNum } from '../../interfaces/sinnum';
import { Dropdown } from 'primeng/primeng';

export enum Response {
  YES = 'Yes',
  NO = 'No',
  QUARTERLY = 'QUARTERLY',
  MONTHLY = 'MONTHLY'
}

@Component({
  selector: 'app-contract-status',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contract-status.component.html',
  styleUrls: ['./contract-status.component.scss']
})
export class ContractStatusComponent implements OnInit {
  private _data = new BehaviorSubject<Contract[]>([]);
  private _reporting = new BehaviorSubject<Reporting>(null);

  private modelRef: BsModalRef;
  private _selectedIndex: any;
  today: number = Date.now();
  vendorContracts: any[];
  reportContract: Reporting;
  salesTxData: SalesTx;
  contract: Contract;
  orders: any[];
  units: Array<Unit> = [];
  sinClinData: SinNum[] = [];
  sinNums: SinNum[];
  reportZeroSales: string;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  @Input() salesTx: SalesTx;
  @Input() pending: boolean;

  @Output() contractChanged = new EventEmitter<void>();
  @Output() reportZerosaleStatus = new EventEmitter<{ zerosale: string }>();

  @Input()
  set reporting(value) {
    this._reporting.next(value);
  }

  get reportData() {
    return this._reporting.getValue();
  }

  @Input()
  set contracts(value) {
    this._data.next(value);
  }

  get data() {
    return this._data.getValue();
  }

  defaultOptions: SalesTx = {
    fees_amount: '$0.00',
    total_order_sales: '$0.00',
    zerosale: 'No',
    status: 'NOT REPORTED',
    adjust: false
  };

  form = this.fb.group({
    contract_id: '',
    zerosale: 'No',
    selector: this.fb.group({
      orderId: ''
    })
  });

  constructor(
    private fb: FormBuilder,
    private formEntryService: FormEntryService,
    private alertService: AlertsService,
    private modalService: BsModalService
  ) {}

  set selectedIndex(selected) {
    this._selectedIndex = selected;
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  ngOnInit() {
    this._data.takeWhile(() => !this.vendorContracts).subscribe(x => {
      const contracts = this.formEntryService.mapContractDropdown(this.data);
      this.vendorContracts = [...contracts];
    });

    this._reporting
      .takeWhile(() => !this.reportContract)
      .subscribe((r: Reporting) => {
        this.reportContract = this.reportData;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.salesTx) {
      this.salesTxData = Object.assign(
        {},
        this.defaultOptions,
        changes.salesTx.currentValue
      );

      this.reportZeroSales = this.salesTxData.zerosale;

      if (this.reportContract)
        this.form.patchValue(this.populateInitialValues());
    }
  }

  changeContractNumber({ value }) {
    this.alertService.clear();
    const contracts = this.data;
    this.contract = contracts.find(
      (contract: Contract) => contract._id === value
    );
    console.log(this.contract);
    this.contractChanged.emit(value);
  }

  clearFilter(dropdown: Dropdown) {
    dropdown.resetFilter();
  }

  changeReportZeroSales(event, template?: TemplateRef<any>) {
    const { value } = event.target;

    if (value === Response.YES) {
      if (this.reportZeroSales === Response.YES) {
        this.form.patchValue({
          zerosale: value
        });
      } else {
        if (this.salesTxData && this.salesTxData['records']) {
          this.modelRef = this.modalService.show(template, this.config);
        }
        this.form.patchValue({
          zerosale: value
        });
      }
    } else {
      this.form.patchValue({
        zerosale: value
      });
    }

    this.reportZerosaleStatus.emit({ zerosale: value });

    //this.reportZeroSales.emit()
  }

  confirmZeroSales() {
    this.salesTxData = { ...this.salesTxData, zerosale: 'Yes' };
    this.reportZerosaleStatus.emit({ zerosale: 'Yes' });
    this.modelRef.hide();
  }

  closeZeroSalesModal() {
    this.salesTxData = { ...this.salesTxData, zerosale: 'No' };
    this.form.patchValue({
      zerosale: 'No'
    });
    this.modelRef.hide();
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
      this.reportContract.active_reporting_type === 'MONTHLY'
      ? true
      : false;
  }

  toggleTablesDisplay() {}

  populateInitialValues() {
    if (this.reportContract) {
      return {
        adjust: false,
        bpa_type: this.reportContract.bpa_type,
        closeout: this.salesTxData.closeout || 'No',
        // contract_id: this.salesTx.contract_id,
        contract_indicator: this.reportContract.contract_indicator,
        contract_type: this.reportContract.contract_type,
        duns: this.reportContract.duns,
        formal_contract: this.reportContract.formal_contract,
        quarterlyReporting: this.reportContract.quarterlyReporting,
        reportingMethod: 'Form Entry',
        reportingPeriod: this.reportContract.reportingPeriod,
        reporting_type: this.reportContract.reporting_type,
        //  savesubmit: this.salesTx.savesubmit,
        schedule: this.reportContract.schedule,
        totalSales: this.salesTxData.totalSales,
        vendor_name: this.reportContract.vendor_name,
        zerosale: this.salesTxData.zerosale || 'No'
      };
    }
  }
}
