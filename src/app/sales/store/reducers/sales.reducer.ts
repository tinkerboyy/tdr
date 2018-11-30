import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from "@ngrx/store";
import * as fromFormEntry from "./form-entry.reducer";

export interface SalesState {
  sales: fromFormEntry.State;
}

export const reducers: ActionReducerMap<SalesState> = {
  sales: fromFormEntry.FormEntryReducer
};

export const getSalesModuleState = createFeatureSelector<SalesState>(
  "salesFeature"
);

export const getSalesState = createSelector(
  getSalesModuleState,
  (state: SalesState) => state.sales
);

export const getLoadingState = createSelector(
  getSalesState,
  fromFormEntry.getIsLoading
);
export const getContractsState = createSelector(
  getSalesState,
  fromFormEntry.getContracts
);

export const getReportingState = createSelector(
  getSalesState,
  fromFormEntry.getReporting
);

export const getErrorState = createSelector(
  getSalesState,
  fromFormEntry.getErrors
);
