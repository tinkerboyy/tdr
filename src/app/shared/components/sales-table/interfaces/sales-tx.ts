import { Record } from "./record";

export interface SalesTx {
  status?: string;
  records?: Record[];
  fees_amount?: string;
  total_order_sales?: string;
  closeout?: string;
  vendor_name?: string;
  savesubmit?: string;
  formal_contract?: string;
  reportingPeriod?: string;
  zerosale?: string;
  totalSales?: number;
  contract_id?: string;
  adjust?: boolean;
  bpa_type?: string;
  contract_indicator?: string;
  contract_type?: string;
  dateCreated?: string;
  discounts?: Array<any>;
  duns?: string;
  formattedReportingDate?: string;
  formattedReportingPeriod?: string;
  fssi_type?: string;
  lastModifiedBy?: string;
  quarterlyReporting?: false;
  reportingMethod?: string;
  reportingPeriodISOFormat?: string;
  reporting_type?: string;
  schedule?: string;
}
