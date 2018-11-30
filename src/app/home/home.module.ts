import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ContractsComponent } from './containers/contractors-landing/contractors-landing.component';
import { ReportingInfoComponent } from './components/reporting-info/reporting-info.component';
import { ContractsService } from './contracts.service';

const ROUTES: Routes = [
  {
    path: '',
    component: ContractsComponent,
    data: {
      title: 'Home',
      description: 'This page provides a list of contracts for which you have reporting rights. Click on the Contract Number hyperlink to view the reporting history.'
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [ContractsComponent, ReportingInfoComponent],
  providers: [ContractsService]
})
export class HomeModule {}
