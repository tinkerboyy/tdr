import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpResponse,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
import { LoadingBarService } from '../../shared/components/loading-bar/services/loading-bar.service';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  constructor(
    private router: Router,
    private loadingService: LoadingBarService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.start();
    return next.handle(req).do(
      (event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.loadingService.complete();
          // do stuff with response if you want
        }
      },
      (err: any) => {
        this.loadingService.complete();
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 500) {
            this.router.navigate(['v2/error/page-not-found']);
          }
        }
      }
    );
  }
}
