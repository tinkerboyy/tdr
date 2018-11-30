import { SinNum } from "./sinnum";

export interface Reporting {
  vendor_name?: string;
  schedule?: string;
  duns?: string;
  sins?: Array<SinNum>;
  reportingPeriod?: string;
  dailyreportingPeriod?: string;
  active_reporting_type?: string;
  formal_contract: string;
  contract_indicator?: string;
  reporting_type?: string;
  bpa_type?: string;
  contract_type?: string;
  quarterlyReporting?: boolean;
  taskOrders?: Array<TaskOrder>;
}

export interface TaskOrder {
  piid: string;
}
