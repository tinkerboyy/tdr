import { Action } from "@ngrx/store";
import { Contract } from "../../form-entry/interfaces/contract";
import { Reporting } from "../../form-entry/interfaces/reporting";

export const LOAD_CONTRACTS = "[Form Entry] Load Contracts";
export const LOAD_CONTRACTS_SUCCESS = "[Form Entry] Load Contracts Success";
export const LOAD_CONTRACTS_FAIL = "[Form Entry] Load Contracts Fail";

export const LOAD_REPORTING_DATA = "[Form Entry] Load Reporting";
export const LOAD_REPORTING_DATA_SUCCESS =
  "[Form Entry] Load Reporting Success";
export const LOAD_REPORTING_DATA_FAIL = "[Form Entry] Load Reporting Fail";
export const LOAD_SALESTX_DATA = "[Form Entry] Load Sales";
export const LOAD_SALESTX_DATA_SUCCESS = "[Form Entry] Load Sales Success";
export const LOAD_SALESTX_DATA_FAIL = "[Form Entry] Load Sales Fail";
export const ERROR_ACTION = "[Form Entry Error]";

export class LoadContracts implements Action {
  readonly type = LOAD_CONTRACTS;
}

export class LoadContractsSuccess implements Action {
  readonly type = LOAD_CONTRACTS_SUCCESS;

  constructor(public payload: Array<Contract>) {}
}

export class LoadContractsFail implements Action {
  readonly type = LOAD_CONTRACTS_FAIL;

  constructor(public payload: any) {}
}

export class LoadReportingData implements Action {
  readonly type = LOAD_REPORTING_DATA;

  constructor(public payload: string) {}
}

export class LoadReportingDataSuccess implements Action {
  readonly type = LOAD_REPORTING_DATA_SUCCESS;

  constructor(public payload: Reporting) {}
}

export class LoadReportingDataFail implements Action {
  readonly type = LOAD_REPORTING_DATA_FAIL;

  constructor(public payload: any) {}
}

export class LoadSalesTxData implements Action {
  readonly type = LOAD_SALESTX_DATA;

  constructor(public payload: Reporting) {}
}

export class LoadSalesTxDataSuccess implements Action {
  readonly type = LOAD_SALESTX_DATA_SUCCESS;

  constructor(public payload: Reporting) {}
}

export class LoadSalesTxDataFail implements Action {
  readonly type = LOAD_SALESTX_DATA_FAIL;

  constructor(public payload: any) {}
}

export class ErrorAction implements Action {
  readonly type = ERROR_ACTION;

  constructor(public payload: any) {}
}

export type actions =
  | LoadContracts
  | LoadContractsSuccess
  | LoadContractsFail
  | LoadReportingData
  | LoadReportingDataSuccess
  | LoadReportingDataFail
  | LoadSalesTxData
  | LoadSalesTxDataSuccess
  | LoadSalesTxDataFail
  | ErrorAction;
