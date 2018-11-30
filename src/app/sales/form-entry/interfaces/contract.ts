import { Report } from "./report";

export interface Contract {
  _id?: string;
  vendor_name: string;
  end_date: string;
  formal_contract: string;
  contract_id?: string;
  duns: string;
  contract_type: string;
  terminated_date: string;
  reporting: Report[];
  reporting_type: string;
  closeoutEligible?: string;
  label?: string;
  value?: string;
}
