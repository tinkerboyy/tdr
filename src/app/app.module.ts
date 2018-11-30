import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MarkdownModule } from 'ngx-markdown';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { MomentModule } from 'angular2-moment';

// components
import { AppComponent } from './app.component';

// services

// modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, ModalModule, TooltipModule } from 'ngx-bootstrap';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { NavigationService } from './navigation/navigation.service';
import { HeaderComponent } from './navigation/header/header.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { SideNavComponent } from './navigation/side-nav/side-nav.component';
import { PaymentsModule } from './payments/payments.module';
import { ClaimsModule } from './claims/claims.module';
import { SalesModule } from './sales/sales.module';
import { DocumentationModule } from './documentation/documentation.module';
import { AuthGuardService } from './auth/guards/auth-guard.service';

// this would be done dynamically with webpack for builds
const environment = {
  development: true,
  production: false
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

const ROUTES: Routes = [
  {
    path: 'v2',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      {
        path: 'home',
        loadChildren: './home/home.module#HomeModule',
        data: { title: 'Home' }
      },
      {
        path: 'sales',
        loadChildren: './sales/sales.module#SalesModule'
      },
      {
        path: 'error',
        loadChildren: './error/error.module#ErrorModule'
      },
      {
        path: 'documentation',
        loadChildren: './documentation/documentation.module#DocumentationModule'
      },
      { path: '**', redirectTo: 'error/page-not-found' }
    ]
  }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    MarkdownModule.forRoot(),
    MomentModule,
    NgIdleKeepaliveModule.forRoot(),
    PaymentsModule,
    ClaimsModule,
    SalesModule,
    SharedModule.forRoot(),
    AuthModule.forRoot(),
    DocumentationModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent
  ],
  providers: [Title, NavigationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
