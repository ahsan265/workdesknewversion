import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { User } from './model/User';
import { AuthService } from './service/auth.service';
import { GigaaaApiService } from './service/gigaaaapi.service';
import { LoginBtnComponent } from './useraccount/landingpage/login-btn/login-btn.component';
import * as color from 'string-to-color';
import { sharedres_service } from './service/sharedres.service';
import { MessageService } from './service/messege.service';
import { agentsocketapi } from './service/agentsocketapi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  integration: any;
  lastuserintegration: any = '';
  integration_id: any;
  pageTitle: string = 'Dashboard';
  workplaces = [];
  redirectUri = `${environment.oauth_url}/logout?continue=${environment.uri}/logout`;

  dashboardIcon = '../assets/assets_workdesk/dashboard_icon .svg';
  activedashboardIcon = '../assets/assets_workdesk/dashboard_icon .svg';

  callIcon = '../assets/assets_workdesk/calls_icon.svg';
  activeCallIcon = '../assets/assets_workdesk/calls_icon.svg';

  agentIcon = '../assets/assets_workdesk/Group_4.svg';
  activeAgentIcon = '../assets/assets_workdesk/Group_4.svg';

  activityIcon = '../assets/images/sidemenu//activities_icon.svg';
  activeActivityIcon = '../assets/images/sidemenu//activities_icon_active.svg';
  select_integration_icon = '../assets/assets_workdesk/select_integration.svg';

  logo = '../assets/logo.png';
  logoCollapsed = '../../assets/images/sidemenu/gigaaa-layer-logo-1.png';

  websites = [
    {
      name: 'Partnership',
      url: 'https://partnerships.gigaaa.com/',
      src: '../assets/assets_workdesk/partnership.svg',
    },
    {
      name: 'Console',
      url: 'https://console.gigaaa.com/',
      src: '../assets/assets_workdesk/console.svg',
    },
    {
      name: 'Workdesk',
      url: 'https://workdesk.gigaaa.com/',
      src: '../assets/assets_workdesk/workdesk.svg',
    },
    {
      name: 'Messenger',
      url: 'https://messenger.gigaaa.com/',
      src: '../assets/assets_workdesk/messenger.svg',
    },
    {
      name: 'Analytics',
      url: 'https://analytics.gigaaa.com/',
      src: '../assets/assets_workdesk/analytics.svg',
    },
  ];
  sidebarData: any = [
    {
      iconUrl: this.select_integration_icon,
      name: 'Select integration',
      dropdownItems: [],
      dropdown: true,
    },
    {
      iconUrl: this.dashboardIcon,
      activeIconUrl: this.activedashboardIcon,
      name: 'Dashboard',
      routeUrl: ['/dashboard'],
      dropdown: false,
    },
    {
      iconUrl: this.callIcon,
      activeIconUrl: this.activeCallIcon,
      name: 'Calls',
      routeUrl: ['/calls'],
      dropdown: false,
    },
    {
      iconUrl: this.agentIcon,
      activeIconUrl: this.activeAgentIcon,
      name: 'Agents',
      routeUrl: ['/agents'],
      dropdown: false,
    },
  ];
  slideOpened: boolean = false;
  oauthUrl = `${environment.oauth_url}`;
  token: string;
  online_status: any;
  statusonline: boolean;
  accessToken;
  user: User;
  url: String;

  // This is property for show/hide online button
  showOnlineButton: boolean = true;

  constructor(
    public authService: AuthService,
    private apiService: GigaaaApiService,
    private cookie: CookieService,
    private messegeService: MessageService,
    private agentsocketapi: agentsocketapi,
    private sharedres: sharedres_service,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.code != null) {
        this.pageTitle = 'Dashboard';
      } else {
        this.url = window.location.href;
        let locID = this.url.split('/');
        this.pageTitle = locID[3].charAt(0).toUpperCase() + locID[3].slice(1);
      }
    });
    this.authService.user.subscribe((r: any) => {
      console.log('App component Auth Service', r);
      this.user = r;
      // this.getallintegrationlist();
      // this.calltheagentsocket();
    });

    this.authService.accessToken.subscribe((res: any) => {
      this.token = res.access_token;
      this.apiService.getCurrentUser(this.token).subscribe((r: any) => {
        r.api_token = this.token;
        r.color = color.default(r.profile.first_name + r.profile.last_name);
        this.authService.user.next(r);
        this.cookie.set('gigaaa_user', JSON.stringify(r));
        this.cookie.set('access_token_active', JSON.stringify(res));
        this.router.navigate(['/dashboard']);
      });
    });
  }

  addNewRouteName(event: any) {
    this.pageTitle = event;
  }

  isSlideOpened(slideOpened: any) {
    console.log(slideOpened);
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

  // get all integration
  getallintegrationlist() {
    try {
      const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'));
      var accesstokenMuhamed = getdata.access_token;
      var uuid = getdata.subscription_id.subsid.uuid;
      this.apiService.getallintegration(accesstokenMuhamed, uuid).subscribe((data) => {
        this.integration = data;

        this.integration.forEach((element) => {
          if (element.last_used === true) {
            localStorage.setItem(
              'intgid',
              JSON.stringify({ int_id: element.uuid, name: element.name })
            );
            this.lastuserintegration = element.name;
          }
        });
        let updatearr = this.integration.map((item, i) =>
          Object.assign(item, { routeUrl: ['/intents'] })
        );

        let update_integration_list = updatearr;
        console.log(update_integration_list);
        this.sidebarData.forEach((element) => {
          if (element.name == 'Select integration') {
            element.dropdownItems = update_integration_list;
            element.name = this.lastuserintegration;
          }
        });
        console.log(this.sidebarData);
      });
    } catch (error) {
      this.handleLoginRegisterError(error.error.error);
    }
  }
  private handleLoginRegisterError(response: any) {
    console.log(response);
    this.messegeService.setErrorMessage(
      response.error.error,
      'toast-bottom-right'
    );
  }
  showonlinetatus(value: any) {
    if (value == 0) {
      this.online_status = 'Online';
      this.statusonline = true;
    } else if (value == 1) {
      this.online_status = 'Away';
      this.statusonline = false;
    }
  }

  // get the online status when agent is online or away.
  calltheagentsocket() {
    this.sharedres.runthesocketforagent$.subscribe((data) => {
      const status = JSON.parse(localStorage.getItem('user-status'));
      console.log(data);
      if (data == 1) {
        if (status == false) {
          this.showonlinetatus(1);
        } else if (status == true) {
          this.showonlinetatus(0);
        }
      }
    });
  }
  public setonlinestatus(e) {
    console.log(e);
    localStorage.setItem('user-status', JSON.stringify(e));
    this.agentsocketapi.send_isonline_status(e);
    if (e == true) {
      this.online_status = 'Online';
      this.statusonline = true;
    } else if (e == false) {
      this.online_status = 'Away';
      this.statusonline = false;
    }
  }
  public openwebsites(val) {
    window.open(val, '_blank');
  }


  // This is callback function for getting information about sidebar
  isSidebarOpen(event: any) {
    console.log('Is sidebar open', event);
  }


  // This is function for online butotn event
  isOnlineButtonClicked(event: any) {
    console.log('From app', event);
  }
}
