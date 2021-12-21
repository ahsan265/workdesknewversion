import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: []
})
export class LogoutComponent implements OnInit {
  redirectUri = environment.uri;

  constructor(
    private authService: AuthService,
    private cookie: CookieService

  ) { }

  ngOnInit(): void {
    this.authService.accessToken.next(null);
    this.cookie.deleteAll();
    this.authService.logOff();
    location.href = this.redirectUri;
  }

}
