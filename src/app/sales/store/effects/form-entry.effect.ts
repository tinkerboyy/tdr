import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { FormEntryService } from "../../form-entry/form-entry.service";

import { map, switchMap, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

import * as FormEntryActions from "../actions/form-entry.action";

@Injectable()
export class FormEntryEffects {
  constructor(private actions$: Actions, private service: FormEntryService) {}

  @Effect()
  loadContracts$ = this.actions$.ofType(FormEntryActions.LOAD_CONTRACTS).pipe(
    switchMap(() => {
      return this.service.fetchVendorContracts().pipe(
        map(contracts => {
          return new FormEntryActions.LoadContractsSuccess(contracts);
        }),
        catchError(error => {
          return of(new FormEntryActions.LoadContractsFail(error));
        })
      );
    })
  );

  @Effect()
  loadReporting$ = this.actions$
    .ofType(FormEntryActions.LOAD_REPORTING_DATA)
    .pipe(
      map((action: FormEntryActions.LoadReportingData) => action.payload),
      switchMap(selected => {
        return this.service
          .fetchNotReportedPeriod(selected)
          .pipe(
            map(
              reporting =>
                new FormEntryActions.LoadReportingDataSuccess(reporting)
            ),
            catchError(error =>
              of(new FormEntryActions.LoadReportingDataFail(error))
            )
          );
      })
    );
}
