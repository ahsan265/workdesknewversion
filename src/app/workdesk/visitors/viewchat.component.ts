import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { gigaaasocketapi } from 'src/app/service/gigaaasocketapi.service';
import { MessageService } from 'src/app/service/messege.service';
import { sharedres_service } from 'src/app/service/sharedres.service';
declare var $: any;


@Component({
  selector: 'app-viewchat',
  templateUrl: './viewchat.component.html',
  styleUrls: ['./viewchat.component.css']
})
export class ViewchatComponent implements OnInit {
  langurl:any;
  visitorlist:any;
  hide:boolean=false;
  agentdata:any;
  listuser:any;
  thisoperatsystemnurl:any;
  browserurl:any;
  deviceurl:any;
  operatsystemnurl:any;
  listofuser=[{name:'Show all' ,status:true},
  {name:'Registered' ,status:false},
  {name:'Known Guest' ,status:false},
  {name:'Unknown' ,status:false}];
  language=[{name:'Arabic' ,status:true},
  {name:'English' ,status:false},
  {name:'German' ,status:false},
  {name:'Russina' ,status:false},
  {name:'Spanish' ,status:false},
  {name:'Turkish' ,status:false}
];

currentvisitor:boolean;
passtvisitor:boolean;
currentvisitorlength:any;
passtvisitorlength:any;
  constructor(private changeDetector: ChangeDetectorRef,private  socketapi:gigaaasocketapi ,private gigaaaapi:GigaaaApiService,
    private sharedres:sharedres_service,private messege:MessageService) { }

  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.changeDetector.detectChanges();
    });
      this.getvisitorlistonload();
      this.getvisitlisttrigger();
      this.getalllanguage(true);
      this.getsocketvisitorpagedata();
      $(document).ready(function() {
        $(document).foundation();
      });
      this.getpanalview("current");
  }
  counter(u: number) {
    return new Array(u);
  }
  selectsubscription1(val){
    this.listuser=val
    $('li.user').on('click', function () {
      var isActive = $('#accordian',).toggleClass('is-active');
     if(isActive){
         $('.submenuu').removeClass("is-active").css('display', 'none');
     }
  });
  }
  selectsubscription(val){
    this.listuser=val
  }

  
  getalllanguage(val)
  {
    var udpatedlang=[];
 if(val==true)
 {
   this.language.forEach(element => {
      udpatedlang.push({name:element.name,status:true})
   });
 }
 else{
  this.language.forEach(element => {
    udpatedlang.push({name:element.name,status:false})
 });
 }
 this.language=udpatedlang;
  }

//getlanguage
changecountryflag(val)
{
 if(val=="en")
 {
return this.langurl='../../../assets/assets_workdesk/united-kingdom.svg'
 }
 else if(val=="de") {
  return this.langurl='../../../assets/Wikipedia-Flags-DE-Germany-Flag_27.svg'

 }
 else if(val=="ar") {
  return this.langurl='../../../assets/assets_workdesk/spain.svg'

}
else if(val=="es") {
  return this.langurl='../../../assets/assets_workdesk/italy.svg'

}
else if(val=="ru") {
  return this.langurl='../../../assets/assets_workdesk/russia.svg'

}
else if(val=="tr") {
  return this.langurl='../../../assets/assets_workdesk/turkey.svg'

}
else
{
  return this.langurl='../../../assets/Wikipedia-Flags-DE-Germany-Flag_27.svg'

}
}

changebrowser(val)
{
 if(val=="Chrome")
 {
  return this.browserurl="../../../assets/Google-chrome-logo-in-flat-design-on-transparent-PNG_1.svg";
 }
 else if(val=="Firefox")
 {
  return this.browserurl="../../../assets/Firefox_Project_Logo_2019_1.svg";
 }
 else if(val=="Safari") {
  return this.browserurl="../../../assets/assets_workdesk/safari.svg";
 }
 else if(val=="Opera") {
  return this.browserurl="../../../assets/assets_workdesk/opera.svg";
}
else if(val=="Opera Touch") {
  return this.browserurl="../../../assets/assets_workdesk/opera.svg";
}
else if(val=="edge") {
  return  this.browserurl="../../../assets/assets_workdesk/internet-explorer.svg";
}
else if(val==null)
{
  return this.browserurl="../../../assets/assets_workdesk/browser.svg";
}
else
{
  return this.browserurl="../../../assets/assets_workdesk/browser.svg";

}
}
// change device 
changedevicetype(val)
{
 if(val==true)
 {
  return this.deviceurl="../../../assets/Group_97.svg";
 }
else
{
  return this.deviceurl="../../../assets/Group_96_1.svg";
}
}

// change operation system
changeoperatingsystem(val)
{
 if(val=="macOS")
 {
  return this.operatsystemnurl="../../../assets/Group_99.svg";
 }
 else if(val=="iOS")
 {
  return this.operatsystemnurl="../../../assets/Group_99.svg";
 }
 else if(val=="Windows") {
  return this.operatsystemnurl="../../../assets/Group_98.svg";
 }
 else if(val=="Android") {
  return this.operatsystemnurl="../../../assets/android.svg";
 }
else if(val==null)
{
  return this.operatsystemnurl="../../../assets/Group_98.svg";
}
else{
  {
    return this.operatsystemnurl="../../../assets/Group_98.svg";
  }
}
}
  // get visitor page 
  getvisitorlist(token,id)
  {const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
  var uuid=getdata.subscription_id.subsid.uuid;
    this.gigaaaapi.getvisitorlist(token,uuid,id).subscribe(data=>{
      this.visitorlist=data
      this.currentvisitorlength=this.visitorlist.length;
      console.log(data);
    },err=>{
      this.messege.setErrorMessage(err.error);
    })
  }
   

  //get socket response 
  getsocketvisitorpagedata()
  {
    try{
        this.socketapi.getlistofvisitor$.subscribe(data=>{
          this.visitorlist=data;
          this.currentvisitorlength=this.visitorlist.length;
          console.log(data);

        })
    }
    catch(err)
    {
      this.messege.setErrorMessage(err.error.error)
    }
  }

  getvisitlisttrigger()
  {    const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
      var accesstoken=getdata.access_token;

    this.sharedres.submitapplication$.subscribe(data=>{
      
 
      this.getvisitorlist(accesstoken,data.int_id);
      })
  }
  getvisitorlistonload()
  {
    const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
    var accesstoken=getdata.access_token;
    const id = JSON.parse(localStorage.getItem('intgid'))
    this.getvisitorlist(accesstoken,id.int_id);  
  }

  calculatetime(totalSeconds)
  {
    
    totalSeconds = Number(totalSeconds);
      var h = Math.floor(totalSeconds / 3600);
      var m = Math.floor(totalSeconds % 3600 / 60);
      var s = Math.floor(totalSeconds % 3600 % 60);
  
      var hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";

      if(h > 0)
      {
        return hDisplay;
      }
      else if(m>0){
        return   mDisplay;
      }
      else  if(s>0)
      {
        return sDisplay; 
      }
  }
   gettime(val) {
    // later record end time
    var endTime = new Date();
    var startTime = new Date(val);

    // time difference in ms
    let timeDiff = endTime.getTime() - startTime.getTime()

    // strip the miliseconds
    timeDiff /= 1000;

    // get seconds
    var seconds = Math.round(timeDiff % 60);

    // remove seconds from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get minutes
    var minutes = Math.round(timeDiff % 60);

    // remove minutes from the date
    timeDiff = Math.floor(timeDiff / 60);

    // get hours
    var hours = Math.round(timeDiff % 24);

    // remove hours from the date
    timeDiff = Math.floor(timeDiff / 24);

    // the rest of timeDiff is number of days
    var days = timeDiff;
  //  setTimeout(this.display(startTime.getTime()), 1000);

  return ("0" + minutes).slice(-2) + ":" + ("0" +seconds).slice(-2);
}

  //gettabs
  getpanalview(val){
    if(val=="current")
    {
      this.currentvisitor=false;
      this.passtvisitor=true;
    }
    else if(val=="past")
    {
      this.currentvisitor=true;
      this.passtvisitor=false;
    }
  }

}
