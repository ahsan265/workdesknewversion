import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { agentsocketapi } from 'src/app/service/agentsocketapi';
import { oAuthService } from 'src/app/service/authservice.service';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { gigaaasocketapi } from 'src/app/service/gigaaasocketapi.service';
import { MessageService } from 'src/app/service/messege.service';
import { sharedres_service } from 'src/app/service/sharedres.service';
import { UserloginserviceService } from 'src/app/service/userloginservice.service';
declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
integration:any;
defaultingt:any;
sellertype:any;
languagetag:any;
languageflag:any;
username:any;
userimg:any;
updatelanguages:any;
online_status:any;
agentrole:any;
statusonline:boolean;
languages = [
  { name: 'English', id: 56, image: "/assets/language/united-kingdom.png" },
  { name: 'German', id: 83, image: "/assets/language/germany.png" },
  { name: 'Spanish', id: 131, image:"/assets/language/spain.png" },
  { name: 'Arabic', id: 175, image:"/assets/language/egypt.png" },
  { name: 'Russian', id: 6, image:"/assets/language/russia.png" },
  { name: 'Turkish', id: 161,image: "/assets/language/turkey.png" }
];
websites=[{name:"Partnership",url:'https://partnerships.gigaaa.com/'},
{name:"Console",url:'https://console.gigaaa.com/'},
{name:"Messenger",url:'https://messenger.gigaaa.com/chat'}]
  constructor(private gigaaasocket:gigaaasocketapi,private sharedres:sharedres_service,private messege:MessageService,private gigaaaapi:GigaaaApiService,private route: Router,private useraccountservice:UserloginserviceService,
    private AuthService:oAuthService,private agentsocketapi:agentsocketapi)
    {

    }

  ngOnInit(): void {
    this.getallintegrationlist();
    this.getuserdetails();
    this.getagentrole();
    this.languagetag='English';
    this.languageflag='/assets/language/united-kingdom.png';
    this.getlanguage(this.languagetag,this.languageflag)
    $('.arrowicon').on('click', function () {
      $('#sidebar').toggleClass('active');

 var icon1 = $(this).parent().find("#sidebarCollapse")

 if (icon1.hasClass('collapseicon1'))

     icon1.removeClass('collapseicon1').addClass("collapseicon2");
 else
     icon1.removeClass('collapseicon2').addClass("collapseicon1");

 var icon = $(this).parent().find(".fas")
 if (icon.hasClass('fas fa-chevron-left'))

     icon.removeClass('fas fa-chevron-left').addClass("fas fa-chevron-right");
 else
     icon.removeClass('fas fa-chevron-right').addClass("fas fa-chevron-left");
});
  // formobile
  $('.toggleicon').on('click', function () {
    $('#sidebar').toggleClass('topbar');

    var icon1 = $(this).parent().find("#toggleCollapse")

    if (icon1.hasClass('toggleicon1'))

        icon1.removeClass('toggleicon1').addClass("toggleicon2");
    else
        icon1.removeClass('toggleicon2').addClass("toggleicon1");

    });
    $('li.listitem').on('click', function () {
      $('#sidebar').toggleClass('topbar');
      var icon1 = $(this).parent().find("#toggleCollapse")
      if(icon1){
        $('#toggleCollapse').removeClass('toggleicon2').addClass("toggleicon1");
    }



  });
   this.calltheagentsocket();
  }
  toggleSideBar(){
    console.log('Brate moj');
    this.gigaaasocket.closewebsocketcalls();
    this.agentsocketapi.closeagentsocket();
    this.AuthService.logOff();
    this.useraccountservice.getopendashboard(2);
    this.route.navigate(['/']);
  }

 public async   getintegration(val,int_id)
    {

      const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
      var accesstoken=getdata.access_token;
      var uuid=getdata.subscription_id.subsid.uuid;
      await  this.gigaaaapi.updatelastusedintegration(accesstoken,uuid,{"integration": int_id})
      this.defaultingt=val;
      this.sharedres.getintegrationrelation(int_id)
      localStorage.setItem('intgid', JSON.stringify({int_id:int_id,name:val}));
     // this.showonlinetatus()
      this.sharedres.getuserole();
      this.sharedres.getcallsocketapi(1);
    }

    // setinetgration()
    // {
    // const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
    //  var accesstoken=getdata.access_token;
    //  var uuid=getdata.subscription_id.subsid.uuid;
    //   const intg = JSON.parse(localStorage.getItem('intgid'))
    //   if(intg?.name!=null){
    //     this.defaultingt=intg.name;
    //   //  this.showonlinetatus()
    //   }
    //   else{
    //     this.defaultingt="Select integration";

    //   }

    // }

     getallintegrationlist()
    {
     try {
    const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
    var accesstoken=getdata.access_token;
    var uuid=getdata.subscription_id.subsid.uuid;
    this.gigaaaapi.getallintegration(accesstoken,uuid).subscribe(data=>{
    console.log(data)
    this.integration=data;
    this.integration.forEach(element => {
      if(element.last_used===true)
      {        
        localStorage.setItem('intgid', JSON.stringify({int_id:element.uuid,name:element.name}));
        this.defaultingt=element.name;
        this.sharedres.getintegrationrelation(element.uuid);
       // this.getonlinestatus(accesstoken,uuid,element.uuid);
       this.sharedres.getuserole();
       var intid = JSON.parse(localStorage.getItem('intgid'))
       this.gigaaaapi.getloggedinagentuuid(accesstoken,uuid,intid.int_id).subscribe(data=>{
       console.log(data);
       localStorage.setItem('userlogged_uuid', JSON.stringify(data));
        //  this.showonlinetatus(0);
         this.sharedres.getcallsocketapi(1);
       });
      }
    });

    })

  } catch (error) {
    this.handleLoginRegisterError(error.error.error);
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
 getuserdetails()
 {
  const getdata = JSON.parse(localStorage.getItem('gigaaa-user'));
  this.username=getdata?.profile.first_name+" "+getdata?.profile.last_name;
  this.userimg=getdata?.avatar_url_tiny

 }
 private handleLoginRegisterError(response: any) {
  console.log(response)
      this.messege.setErrorMessage(response.error.error, 'toast-bottom-right');
}

getlanguage(name,flag)
{
  var itemsToRemove = [name];
  this.languageflag=flag;
  this.languagetag=name;
  // var newlangtemp=[{id:id,name:name,image:flag}];

   this.updatelanguages = this.languages.filter(function(e) {
    return itemsToRemove.indexOf(e.name) === -1;
  });
  //this.languages=newItems;
}

// onlinestatus(val)
// {
//   if(val==true)
//   {
//       this.online_status="Online"
//   }
//   else{
//     this.online_status="Away"

//   }


// }
// get online status of user logged in.
// getonlinestatus(token,orgid,intid)
// {
//     this.gigaaaapi.getagentonlinestatus(token,orgid,intid).subscribe(data=>{
//     console.log(data)
//     localStorage.setItem('user-status', JSON.stringify(data['is_online']));
//     this.showonlinetatus(0);
//   })

// }
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

// setonline status
public setonlinestatus(e)
{
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
// get agent role
getagentrole()
{
  this.sharedres.agentrole$.subscribe(data=>{
    if ( data['is_admin']==true)
    {
      this.agentrole="Admin"
    }
    else{
      this.agentrole="Agent"
    }
  })
}

openwebsites(val)
{
  window.open(val, '_blank');
}
}



