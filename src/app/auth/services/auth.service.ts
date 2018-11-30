import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export enum Auth {
  SERVER_TIME = '/TDR/service/commonservice/systemdate',
  DISPLAY_NAME = '/TDR/vendoruser/service/commonservice/displayname',
  LOGOUT = '/TDR/vendoruser/service/commonservice/logout',
  VERSION = '/TDR/service/commonservice/versionno',
  PERMISSIONS = '/TDR/internaluser/service/getuserpermissions'
}

@Injectable()
export class AuthService {
  private user: any;
  isLoginSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getAppVersion(): Observable<string> {
    // this.isLoginSubject.next(true);
    return this.http.get(Auth.VERSION, { responseType: 'text' });
  }

  getServerTime(): Observable<any> {
    return this.http.get(Auth.SERVER_TIME);
  }

  getDisplayName(): Observable<any> {
    return this.http.get(Auth.DISPLAY_NAME, { responseType: 'text' });
  }

  logOut(): Observable<any> {
    return this.http.get(Auth.LOGOUT, { responseType: 'text' });
  }

  getPermissions(): Observable<any> {
    return this.http.get(Auth.PERMISSIONS);
  }

  isAuth() {
    //return this.user != null;

    return true;
  }

  get data() {
    return this.isLoginSubject.value;
  }

  checkPermissions() {}

  isLoggedIn() {
    return this.isLoginSubject.asObservable();
  }

  confirm(confirm) {}
}
