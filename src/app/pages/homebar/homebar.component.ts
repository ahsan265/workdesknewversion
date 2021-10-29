import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authservice.service';
import { UserloginserviceService } from 'src/app/service/userloginservice.service';
declare var $: any;
@Component({
  selector: 'app-homebar',
  templateUrl: './homebar.component.html',
  styleUrls: ['./homebar.component.css']
})

export class HomebarComponent implements OnInit {
  username:any;
  dashBoardTitle:any;
  languagetag:any;
  languageflag:any;
  languages = [
    { name: 'EN', id: 56, image: "/assets/language/flag-of-United-Kingdom.png" },
    { name: 'DE', id: 83, image: "/assets/language/flag-of-Germany.png" },
    { name: 'ES', id: 131, image:"/assets/language/flag-of-Spain.png" },
    { name: 'AR', id: 175, image:"/assets/language/flag-of-Egypt.png" },
    { name: 'RU', id: 6, image:"/assets/language/flag-of-Russia.png" },
    { name: 'TR', id: 161,image: "/assets/language/flag-of-Turkey.png" }
  ];
  websites=[{name:"Partnership",url:'https://partnerships.gigaaa.com/'},
{name:"Console",url:'https://console.gigaaa.com/'},
{name:"Messenger",url:'https://messenger.gigaaa.com/chat'}]
  constructor(private route: Router,private useraccountservice:UserloginserviceService,
    private AuthService:AuthService) { }

  ngOnInit(): void {
    this.dashBoardTitle="WorkDesk";
    this.languagetag='EN';
    this.languageflag='/assets/language/flag-of-United-Kingdom.png';
    $('.arrowicon').on('click', function () {
      $(' #content').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });
  var userinfo=this.AuthService.getLoggedUser();
  this.username=userinfo.profile.first_name;

  //this.route.navigate(['dashboard']);
  }
  
  changeRoute(dashboardName:any){

    this.dashBoardTitle=dashboardName;
}

getlanguagecode(val,img)

 {
   console.log(val)
  this.languagetag=val;
  this.languageflag=img;
 }
 logout(){
  this.AuthService.logOff();
    this.useraccountservice.getopendashboard(2);
    this.route.navigate(['/']);}

}
