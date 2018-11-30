import { Component, OnInit } from '@angular/core';
import { DataTableSettings } from '../../../shared/components/data-table/interfaces/data-table-settings';
import { ContractsService } from '../../contracts.service';
import { Subject } from 'rxjs/Subject';
import { ContractInfo } from '../../interfaces/contract-info';
import { ReportingData } from '../../interfaces/reporting-data';
import { LoadingBarService } from '../../../shared/components/loading-bar/services/loading-bar.service';

@Component({
  selector: 'app-contracts',
  templateUrl: './contractors-landing.component.html',
  styleUrls: ['./contractors-landing.component.scss']
})
export class ContractsComponent implements OnInit {
  private loadingState = new Subject<boolean>();
  isLoading = true;
  contractorsLandingReportingData: object;
  contractorsLandingDataTable: object[];
  contractorsLandingDataTableSettings: DataTableSettings = {
    sortColumn: 'last_reported',
    sortOrder: '-1',
    selectable: '',
    summary:
      'This table is a listing of all your contract numbers with the most recent hi level activity associate to contract number.',
    columns: [
      {
        field: 'contract_id',
        header: 'Contract Number',
        format: 'link',
        link: 'href_search',
        width: '17%',
        label: 'Contract number',
      },
      {
        field: 'reporting_type',
        header: 'Current Reporting Frequency',
        width: '25%',
        label: 'Reporting Frequency',
      },
      {
        field: 'last_reported',
        header: 'Last Reported',
        format: 'date_full',
        width: '16%',
        label: 'Last Reported'
      },
      {
        field: 'reporting_period_str',
        sort_field: 'reportingPeriodSort',
        header: 'Report Period Ending',
        //format: 'date_month',
        width: '20%',
        label: 'Report period ending'
      },
      {
        field: 'total_out_standing_balance',
        header: 'Total Outstanding Balance',
        format: 'balance',
        link: 'href_pay',
        width: '22%',
        label: 'total ousting balance'
      },
      {
        field: 'last_reported_str',
        header: '',
        format: 'hidden'
      },
      {
        field: 'reporting_period_str',
        header: '',
        format: 'hidden'
      },
      {
        field: 'total_out_standing_balance_str',
        header: '',
        format: 'hidden'
      }
    ]
  };
  

  constructor(private service: ContractsService) {}

  ngOnInit() {
    this.loadingState.subscribe((next: boolean) => (this.isLoading = next));
    this.fetchVendorContracts();
  }

  // Get contractor landing data from api
  fetchVendorContracts() {
    this.loadingState.next(true);
    this.service.getVendorContracts().subscribe(
      (contracts: { data: Array<ContractInfo>; header: ReportingData }) => {
        this.loadingState.next(false);
        const { data, header } = contracts;
        this.contractorsLandingReportingData = header;
        this.contractorsLandingDataTable = this.getReportingPeriodRange(data);
      },
      error => {
        this.loadingState.next(false);
      }
    );
  }

  // Format the start reporting month and end
  // reporting month based on contract type
  public getReportingPeriodRange(tableData = []) {
    const tableList = tableData;

    return tableList.map(tb => {
      let reportingPeriodSort = parseInt(tb.end_reporting_month, 10);
      if (tb.last_reported) {
        return {
          ...tb,
          reportingPeriodSort,
          reportingPeriod: tb.end_reporting_month
        };
      } else {
        return {
          ...tb,
          reportingPeriod: `--`,
          reportingPeriodSort: `--`
        };
      }
    });
  }
}
