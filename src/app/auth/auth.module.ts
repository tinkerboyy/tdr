import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './guards/auth-guard.service';
import { AuthService } from './services/auth.service';
import { InterceptorService } from './interceptor/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, SharedModule.forRoot()],
  declarations: [],
  providers: []
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        AuthService,
        AuthGuardService,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: InterceptorService,
          multi: true
        }
      ]
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: AuthModule,
    private snackBar: MatSnackBar
  ) {
    if (parentModule) {
      // this.alertService.logError('Core Module is already loaded. It can only be imported in the AppModule');
    }
  }
}
