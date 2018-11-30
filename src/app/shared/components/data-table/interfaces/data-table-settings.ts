import { DataTableProperties } from "./data-table-properties";

export interface DataTableSettings {
  sortColumn: string;
  sortOrder: string;
  selectable?: string;
  summary?: string;
  columns: Array<DataTableProperties>;
}
