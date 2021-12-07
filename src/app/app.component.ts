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
import { sharedres_service } from './service/sharedres.service';
import { MessageService } from './service/messege.service';
import { agentsocketapi } from './service/agentsocketapi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  pageTitle: string = 'Dashboard';
  workplaces = [];
  redirectUri = `${environment.oauth_url}/logout?continue=${environment.redirect_uri}/logout`;

  dashboardIcon = '../assets/assets_workdesk/dashboard_icon .svg';
  activedashboardIcon = '../assets/assets_workdesk/dashboard_icon .svg';

  callIcon = '../assets/assets_workdesk/calls_icon.svg';
  activeCallIcon = '../assets/assets_workdesk/calls_icon.svg';

  agentIcon = '../assets/assets_workdesk/Group_4.svg';
  activeAgentIcon = '../assets/assets_workdesk/Group_4.svg';
  
  activityIcon = '../assets/images/sidemenu//activities_icon.svg';
  activeActivityIcon = '../assets/images/sidemenu//activities_icon_active.svg';

  logo = '../assets/gigaaa_logo_long_new.png';
  logoCollapsed = '../assets/images/sidemenu//gigaaa_logo_square.png';
  websites=[{name:"Partnership",url:'https://partnerships.gigaaa.com/',src:'../assets/assets_workdesk/partnership.svg'},
{name:"Console",url:'https://console.gigaaa.com/',src:'../assets/assets_workdesk/console.svg'},
{name:"Workdesk",url:'https://workdesk.gigaaa.com/',src:'../assets/assets_workdesk/workdesk.svg'},
{name:"Messenger",url:'https://messenger.gigaaa.com/',src:'../assets/assets_workdesk/messenger.svg'},
{name:"Analytics",url:'https://analytics.gigaaa.com/',src:'../assets/assets_workdesk/analytics.svg'}]
  sidebarData: any = [
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
  online_status:any;
  statusonline:boolean;
  accessToken = new ReplaySubject(1);

  user: User;
  integration:any;
  constructor(
    public authService: AuthService,
    private apiService: GigaaaApiService,
    private cookie: CookieService,
    private share_res:sharedres_service,
    private messegeService:MessageService,
    private agentsocketapi:agentsocketapi,
    private sharedres:sharedres_service,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pageTitle = this.sidebarData[0].name;
    this.authService.user.subscribe((r: any) => {
      this.user = r;
      console.log('BILOOO STA');
     // this.getallintegrationlist();
      this.calltheagentsocket();

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
  getallintegrationlist()
  {
   try {
  const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
  var accesstoken=getdata.access_token;
  var uuid=getdata.subscription_id.subsid.uuid;
  this.apiService.getallintegration(accesstoken,uuid).subscribe(data=>{
  console.log(data)
  this.integration=data;
  this.integration.forEach(element => {
    if(element.last_used===true)
    {        
      localStorage.setItem('intgid', JSON.stringify({int_id:element.uuid,name:element.name}));
      this.share_res.getintegrationrelation(element.uuid);
     this.share_res.getuserole();
     var intid = JSON.parse(localStorage.getItem('intgid'))
     this.apiService.getloggedinagentuuid(accesstoken,uuid,intid.int_id).subscribe(data=>{
     console.log(data);
     localStorage.setItem('userlogged_uuid', JSON.stringify(data));
     this.sharedres.getcallsocketapi(1);
     });
    }
  });

  })

} catch (error) {
  this.handleLoginRegisterError(error.error.error);
}
}
private handleLoginRegisterError(response: any) {
  console.log(response)
      this.messegeService.setErrorMessage(response.error.error, 'toast-bottom-right');
}
showonlinetatus(value:any){
  if(value==0)
  { 

    this.online_status="Online"
    this.statusonline=true;
  }
  else if(value==1)
  {
    this.online_status="Away"
    this.statusonline=false;

  }
 
 }
 calltheagentsocket()
 {    
  this.sharedres.runthesocketforagent$.subscribe(data=>{
    const status = JSON.parse(localStorage.getItem('user-status'))
    console.log(data);
    if(data==1)
    {
      if (status==false)
      {
        this.showonlinetatus(1)

      }
      else if(status==true){
        this.showonlinetatus(0)
      }
    }

  });
 }
 public setonlinestatus(e)
{
  console.log(e)
    localStorage.setItem('user-status', JSON.stringify(e));
    this.agentsocketapi.send_isonline_status(e);
    if(e==true)
    {
      this.online_status="Online"
      this.statusonline=true;

    }
    else if(e==false)
    {
      this.online_status="Away"
      this.statusonline=false;

    }
    }
public openwebsites(val)
{
  window.open(val, '_blank');
}
}
