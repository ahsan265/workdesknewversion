import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { GigaaaApiService } from '../service/gigaaaapi.service';
import { LoginBtnComponent } from '../useraccount/landingpage/login-btn/login-btn.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private cookie: CookieService,
    private apiService: GigaaaApiService,
    private router: Router

  ) {}

  intentIcon = '../../assets/images/sidemenu/intents_icon.svg';
  activeIntentIcon = '../../assets/images/sidemenu/intents_icon_active.svg';
  entityIcon = '../../assets/images/sidemenu/entity.svg';
  activeEntityIcon = '../../assets/images/sidemenu/entity_active.svg';
  flowIcon = '../../assets/images/sidemenu/flow_icon.svg';
  activeFlowIcon = '../../assets/images/sidemenu/flow_icon_active.svg';
  activityIcon = '../../assets/images/sidemenu/activities_icon.svg';
  activeActivityIcon = '../../assets/images/sidemenu/activities_icon_active.svg';

  logo = '../../assets/images/sidemenu/gigaaa-layer-logo-navyblue-1.svg';
  logoCollapsed = '../../assets/images/sidemenu/gigaaa-layer-logo-1.svg';
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
  pageTitle: any;
  user!: User;
  redirectUri = `${environment.oauth_url}/logout?continue=${environment.uri}logout`;
  slideOpened: boolean = false;
  oauthUrl = `${environment.oauth_url}`;
  token: string = this.authService.token?.access_token;

  accessToken = new ReplaySubject(1);

  ngOnInit(): void {
 
    this.pageTitle = this.sidebarData[0].name;
    this.authService.user.subscribe((r: any) => {
      console.log(r)
      this.user = r;
    });

    this.accessToken.subscribe((res: any) => {
      this.authService.token = res;
      this.apiService.getCurrentUser(res.access_token).subscribe((r) => {
        this.authService.user.next(r);
        this.cookie.set('gigaaa_user', JSON.stringify(r));
        this.cookie.set('access_token_active', JSON.stringify(res));
        this.router.navigate(['/']);
      });
    });
  }

  addNewRouteName(event: any) {
    this.pageTitle = event;
  }

  onUserLogout(event: any) {}

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
    if (event) {
      callLogin.generateChallenge('add');
    }
  }

  onSignin(event: any) {
    const callLogin = new LoginBtnComponent(this.cookie);
    if (event) {
      callLogin.generateChallenge('add');
    }
  }
}
