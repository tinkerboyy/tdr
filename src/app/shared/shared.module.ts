import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  DropdownModule,
  DataTableModule,
  MegaMenuModule,
  CalendarModule,
  InputTextModule
} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import {
  MatInputModule,
  MatFormFieldModule,
  MatListModule,
  MatExpansionModule,
  MatSidenavModule,
  MatCardModule,
  MatButtonModule,
  MatSnackBarModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPageScrollModule } from 'ngx-page-scroll';

import { HighlightNumberDirective } from './directives/highlight-number/highlight-number.directive';
import { JoinPipe } from './pipes/join/join.pipe';
import { FloorPipe } from './pipes/floor/floor.pipe';
import { TableService } from './components/sales-table/services/table.service';
import { SalesTableComponent } from './components/sales-table/sales-table.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { ParensPipe } from './pipes/parens/parens.pipe';
import { MonthNamePipe } from './pipes/month-name/month-name.pipe';

import { AlertsComponent } from './components/alerts/alerts.component';
import { AlertsService } from './components/alerts/services/alerts.service';
import { CollapsePanelDirective } from './directives/collapse-panel/collapse-panel.directive';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbsService } from './components/breadcrumbs/services/breadcrumbs.service';
import { FormatListPipe } from './pipes/format-list/format-list.pipe';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';
import { LoadingBarService } from './components/loading-bar/services/loading-bar.service';
import { TabsComponent } from './components/tabset/tabs/tabs.component';
import { TabComponent } from './components/tabset/tab/tab.component';
import { ErrorsDirective } from './directives/errors/errors.directive';
import { FocusDirective } from './directives/focus/focus.directive';
import { TooltipDirective } from './directives/tooltip/tooltip.directive';
import { PageInfoComponent } from './components/page-info/page-info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DropdownModule,
    DataTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    CalendarModule,
    InputTextModule,
    TableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgxPageScrollModule
  ],
  exports: [
    DropdownModule,
    DataTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    MatButtonModule,
    CalendarModule,
    InputTextModule,
    TableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    AlertsComponent,
    SalesTableComponent,
    DataTableComponent,
    HighlightNumberDirective,
    JoinPipe,
    FloorPipe,
    ParensPipe,
    MonthNamePipe,
    CollapsePanelDirective,
    BreadcrumbsComponent,
    FormatListPipe,
    NgxPageScrollModule,
    LoadingBarComponent,
    TabsComponent,
    TabComponent,
    ErrorsDirective,
    FocusDirective,
    TooltipDirective,
    PageInfoComponent
  ],
  declarations: [
    AlertsComponent,
    DataTableComponent,
    SalesTableComponent,
    JoinPipe,
    FloorPipe,
    ParensPipe,
    MonthNamePipe,
    HighlightNumberDirective,
    CollapsePanelDirective,
    BreadcrumbsComponent,
    FormatListPipe,
    LoadingBarComponent,
    TabsComponent,
    TabComponent,
    ErrorsDirective,
    FocusDirective,
    TooltipDirective,
    PageInfoComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AlertsService,
        TableService,
        BreadcrumbsService,
        LoadingBarService,
        JoinPipe,
        FloorPipe,
        ParensPipe,
        MonthNamePipe,
        FormatListPipe
      ]
    };
  }
  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AlertsService,
        TableService,
        BreadcrumbsService,
        LoadingBarService,
        JoinPipe,
        FloorPipe,
        ParensPipe,
        MonthNamePipe,
        FormatListPipe
      ]
    };
  }
}
