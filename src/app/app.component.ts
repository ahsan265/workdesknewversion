import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './model/User';
import { AuthService } from './service/auth.service';
import { GigaaaApiService } from './service/gigaaaapi.service';
import { LoginBtnComponent } from './useraccount/landingpage/login-btn/login-btn.component';
import * as color from "string-to-color";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  pageTitle: string = 'Dashboard';
  workplaces = [];
  redirectUri = `${environment.oauth_url}/logout?continue=${environment.redirect_uri}/logout`;

  intentIcon = '../assets/images/sidemenu/intents_icon.svg';
  activeIntentIcon = '../assets/images/sidemenu//intents_icon_active.svg';
  entityIcon = '../assets/images/sidemenu//entity.svg';
  activeEntityIcon = '../assets/images/sidemenu//entity_active.svg';
  flowIcon = '../assets/images/sidemenu//flow_icon.svg';
  activeFlowIcon = '../assets/images/sidemenu//flow_icon_active.svg';
  activityIcon = '../assets/images/sidemenu//activities_icon.svg';
  activeActivityIcon = '../assets/images/sidemenu//activities_icon_active.svg';

  logo = '../assets/images/sidemenu//gigaaa-layer-logo-navyblue-1.svg';
  logoCollapsed = '../assets/images/sidemenu//gigaaa-layer-logo-1.svg';
  sidebarData: any = [
    {
      iconUrl: this.intentIcon,
      activeIconUrl: this.activeIntentIcon,
      name: 'Dashboard',
      routeUrl: ['/dashboard'],
      dropdown: false,
    },
    {
      iconUrl: this.entityIcon,
      activeIconUrl: this.activeEntityIcon,
      name: 'Calls',
      routeUrl: ['/calls'],
      dropdown: false,
    },
    {
      iconUrl: this.flowIcon,
      activeIconUrl: this.activeFlowIcon,
      name: 'Agents',
      routeUrl: ['/agents'],
      dropdown: false,
    },
  ];
  slideOpened: boolean = false;
  oauthUrl = `${environment.oauth_url}`;
  token: string;

  accessToken = new ReplaySubject(1);

  user: User;

  constructor(
    public authService: AuthService,
    private apiService: GigaaaApiService,
    private cookie: CookieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pageTitle = this.sidebarData[0].name;
    this.authService.user.subscribe((r: any) => {
      this.user = r;
      console.log('BILOOO STA');
    });

    this.accessToken.subscribe((res: any) => {
      console.log('BILOOO STA BRATEEEEEELS JDLAKSJ DLASK JDLASKD JASLKDJ ALSKDJ ASLKDJ ALSKD JAS');
      if (res) {
        this.token = res.access_token;
        this.apiService.getCurrentUser(this.token).subscribe((r: any) => {
          r.api_token = this.token;
          r.color = color.default(r.profile.first_name + r.profile.last_name);
          this.authService.user.next(r);
          this.cookie.set('gigaaa_user', JSON.stringify(r));
          this.cookie.set('access_token_active', JSON.stringify(res));
          this.router.navigate(['/']);
        });
      }
    });
  }

  addNewRouteName(event: any) {
    this.pageTitle = event;
  }

  isSlideOpened(slideOpened: any) {
    this.slideOpened = slideOpened;
  }

  onNoLoggedUsers(event: any) {
    if (event) {
      this.authService.logOff();
      location.href = this.redirectUri;
    }
  }

  onAddAnotherAccount(event: any) {
    const callLogin = new LoginBtnComponent(this.cookie);
    const action: string = 'add';
    if (event) {
      callLogin.generateChallenge(action);
    }
  }

  onSignin(event: any) {
    const callLogin = new LoginBtnComponent(this.cookie);
    const action: string = 'add';
    if (event) {
      callLogin.generateChallenge(action);
    }
  }
}
