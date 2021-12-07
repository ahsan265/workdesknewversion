import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../service/auth.service';
import { oAuthService } from '../service/authservice.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: []
})
export class LogoutComponent implements OnInit {
  redirectUri = environment.uri;

  constructor(
    private authService: AuthService,
    private oauthService:oAuthService

  ) { }

  ngOnInit(): void {
   console.log("hello")
    // this.authService.logOff();
    // this.oauthService.logOff();
    location.href = this.redirectUri;
  }

}
