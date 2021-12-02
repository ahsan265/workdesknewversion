import { Component, OnInit } from '@angular/core';
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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.logOff();
    location.href = this.redirectUri;
  }

}
