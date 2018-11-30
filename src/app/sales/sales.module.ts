import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormEntryComponent } from './form-entry/containers/form-entry/form-entry.component';
import { ContractStatusComponent } from './form-entry/components/contract-status/contract-status.component';
import { FormEntryService } from './form-entry/form-entry.service';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/reducers/sales.reducer';
import { FormEntryEffects } from './store/effects/form-entry.effect';

export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'form-entry' },
  {
    path: 'form-entry',
    component: FormEntryComponent,
    data: {
      title: 'Form Entry'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('salesFeature', reducers),
    EffectsModule.forFeature([FormEntryEffects]),
    SharedModule
  ],
  declarations: [FormEntryComponent, ContractStatusComponent],
  providers: [FormEntryService]
})
export class SalesModule {}
