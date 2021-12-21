import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { CanActivate } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../model/User';
import { oAuthService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  public user: ReplaySubject<User> = new ReplaySubject(1);
  public accessToken: ReplaySubject<any> = new ReplaySubject(1);
  token: any;

  constructor(
    private cookie: CookieService,

  ) {
    if (this.isLoggedIn()) {
      this.user.next(this.getLoggedUser());
    }
    if (this.cookie.get('access_token_active')) {
      this.token = JSON.parse(this.cookie.get('access_token_active'));
      console.log('AUTH SERVICE TOKEN', this.token);
    }
   }
  canActivate(): boolean {

    if (this.isLoggedIn()){
      return true;
    }
    return false;
  }

  public logOff() {
    this.cookie.delete('access_token_active');
    this.cookie.delete('gigaaa_user');
  }

  public isLoggedIn(): boolean {
    return !!this.cookie.check("access_token_active");
  }

  public getLoggedUser(): any {
    return JSON.parse(this.cookie.get('gigaaa_user'));
  }

}
