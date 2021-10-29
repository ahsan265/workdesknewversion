import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from './service/authservice.service';
import { GigaaaApiService } from './service/gigaaaapi.service';
import { gigaaasocketapi } from './service/gigaaasocketapi.service';
import { sharedres_service } from './service/sharedres.service';
import { UserloginserviceService } from './service/userloginservice.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'Work Desk';
  Landingpage:boolean=false;
  Homepage:boolean=false;
    constructor(private socket:gigaaasocketapi, 
    private Authservice:AuthService , 
    public router:Router,
    private route: ActivatedRoute,
    private shared:sharedres_service,
    private useraccountservice:UserloginserviceService) {
  
  }
  ngOnInit(): void {
    $(document).ready(function() {
      $(document).foundation();
    });
    
var isloged=this.Authservice.canActivate();
if(isloged==true)
{
  this.Homepage=false;
  this.Landingpage=true;
 //this.router.navigate[("/agent")]
}
else{
  this.Homepage=true;
  this.Landingpage=false;
}

 this.getlandingpageview();
// this.Homepage=true;
// this.Landingpage=false;
  }
  public async getlandingpageview():Promise<any>
  {
    this.useraccountservice.dashobs$.subscribe(data=>{
      console.log(data)
      if(data==2)
      {
        this.Homepage=true;
        this.Landingpage=false;
       this.router.navigateByUrl('/');
       this.Authservice.logOff();
      }
     else if(data==1)
      {
        this.Homepage=false;
        this.Landingpage=true;
        this.shared.getuserole();
      }
    })
  }
}
