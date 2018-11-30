import * as FormEntryActions from '../actions/form-entry.action';
import { Contract } from '../../form-entry/interfaces/contract';
import { Reporting } from '../../form-entry/interfaces/reporting';

export interface State {
  isLoading: boolean;
  contracts: Array<Contract>;
  reporting: Reporting;
  hasError: any;
}

export const initialState: State = {
  isLoading: false,
  contracts: [],
  reporting: undefined,
  hasError: undefined
};

export function FormEntryReducer(
  state = initialState,
  action: FormEntryActions.actions
) {
  switch (action.type) {
    case FormEntryActions.LOAD_CONTRACTS:
      return {
        ...state,
        isLoading: true
      };

    case FormEntryActions.LOAD_CONTRACTS_SUCCESS:
      return {
        ...state,
        contracts: [...action.payload],
        isLoading: false
      };

    case FormEntryActions.LOAD_CONTRACTS_FAIL:
      return {
        ...state,
        hasError: action.payload,
        isLoading: false
      };

    case FormEntryActions.LOAD_REPORTING_DATA:
      return {
        ...state,
        isLoading: false
      };

    case FormEntryActions.LOAD_REPORTING_DATA_SUCCESS:
      return {
        ...state,
        reporting: action.payload,
        isLoading: false
      };

    case FormEntryActions.LOAD_REPORTING_DATA_FAIL:
      console.log(action);
      return {
        ...state,
        hasError: action.payload,
        isLoading: false
      };

    default: {
      return state;
    }
  }
}

export const getIsLoading = (state: State) => state.isLoading;
export const getContracts = (state: State) => state.contracts;
export const getReporting = (state: State) => state.reporting;
export const getErrors = (state: State) => state.hasError;
