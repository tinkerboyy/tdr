import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ChangeDetectorRef,
  HostListener
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  ActivatedRouteSnapshot,
  ActivatedRoute
} from '@angular/router';
import { BrowserModule, Title } from '@angular/platform-browser';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from './auth/services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { LoadingBarService } from './shared/components/loading-bar/services/loading-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  userName: string;
  versionNo: string;
  servertime: any;
  subscription: Subscription;
  timer: any;

  idleState: string = 'Not started.';
  timedOut: boolean = false;
  lastPing?: Date = null;
  modalRef: BsModalRef;
  firstCount: any = null;
  isNavBarCollapsed = true;
  @ViewChild('sidenav') public sideNav;
  @ViewChild('sessionModal') sessionModal;

  // Toggle side menu on small screens
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const windowSize = event.target.innerWidth;
    if (windowSize <= 768) {
      this.sideNav.close();
    } else {
      this.sideNav.open();
    }
  }

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private idle: Idle,
    private keepalive: Keepalive,
    private modalService: BsModalService,
    private authService: AuthService
  ) {
    // ng-idle setting
    // sets an idle timeout of 14.5 minutess.
    idle.setIdle(870);
    // sets a timeout period of 15 minutes. after 30 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(30);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onIdleEnd.subscribe(() => {
      // this.idleState = 'No longer idle.';
      this.authService.getDisplayName();
      this.hideSessionModal();
    });

    idle.onTimeout.subscribe(() => {
      // this.idleState = 'Timed out!';
      this.timedOut = true;
      this.logout();
      this.idleState = 'Your session has expired.';
    });
    // idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    idle.onTimeoutWarning.subscribe(countdown => {
      // this.idleState = 'If you do not choose an action, you are going to be logged out in ' + countdown + ' due to inactivity.';
      this.idleState = `Due to inactivity, you are going to be logged out in ${countdown}`;
      this.showSessionModal(countdown);
    });
    // sets the ping to server interval to 5 minutes
    keepalive.interval(300);
    keepalive.onPing.subscribe(() => {
      this.lastPing = new Date();
      this.authService.getDisplayName();
      // console.log('pinging the server to reset the session.');
    });
    this.resetSession();
  }

  ngOnInit() {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.activatedRoute)
      .map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      })
      .filter(route => route.outlet === 'primary')
      .mergeMap(route => route.data)
      .subscribe(event => {
        this.titleService.setTitle(`TDR | ${event['title']}`);
      });

    this.timer = Observable.timer(0, 60000);
    this.subscription = this.timer.subscribe(time => this.getTime());

    this.authService
      .getAppVersion()
      .subscribe((version: string) => (this.versionNo = version));

    this.getDisplayName();
  }

  getDisplayName() {
    this.authService
      .getDisplayName()
      .subscribe(displayname => (this.userName = displayname));
  }

  ngAfterViewInit() {
    const windowSize = window.innerWidth;
    if (windowSize <= 768) {
      this.sideNav.close();
    } else {
      this.sideNav.open();
    }
    this.cdRef.detectChanges();

    this.getTime();
  }

  resetSession() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  showSessionModal(count) {
    if (this.firstCount && this.firstCount !== count) {
      return false;
    }
    this.firstCount = count;
    this.modalRef = this.modalService.show(this.sessionModal);
  }

  hideSessionModal() {
    this.modalRef.hide();
  }

  scrollTo(el) {
    const scrollElement = document.getElementById(el);
    scrollElement.scrollIntoView();
  }

  getTime() {
    this.authService
      .getServerTime()
      .subscribe(time => (this.servertime = new Date(time.systemdate)));
  }

  onDeactivate() {
    window.scrollTo(0, 0);
  }

  logout() {
    this.authService.logOut().subscribe(response => {
      window.location.assign(
        '/Shibboleth.sso/SpecialLogout?return=/index.html'
      );
    });
  }
}
