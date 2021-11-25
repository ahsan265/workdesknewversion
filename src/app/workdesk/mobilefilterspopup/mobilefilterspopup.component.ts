import { Component, OnInit, ViewChild } from '@angular/core';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { gigaaasocketapi } from 'src/app/service/gigaaasocketapi.service';
import { MessageService } from 'src/app/service/messege.service';
interface IRange {
  value: Date[];
  label: string;
}
@Component({
  selector: 'app-mobilefilterspopup',
  templateUrl: './mobilefilterspopup.component.html',
  styleUrls: ['./mobilefilterspopup.component.css']
})
export class MobilefilterspopupComponent implements OnInit {
  showmainfilters:boolean=false;
  showselectedrange:boolean=false;
  showlocationfilter:boolean=false;
  showlanguagefilter:boolean=false;
  showcustomdatefilter:boolean=false;
  countrylist:any;
  lang:any;
   // get last week days 
   beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
   day = this.beforeOneWeek.getDay()
   diffToMonday = this.beforeOneWeek.getDate() - this.day + (this.day === 0 ? -6 : 1)
   lastMonday = new Date(this.beforeOneWeek.setDate(this.diffToMonday))
   lastSunday = new Date(this.beforeOneWeek.setDate(this.diffToMonday + 6));
  ranges: IRange[] = [
    {
      value: [new Date(new Date().setDate(new Date().getDate())),new Date()],
      label: 'Today'
    }
    ,{
      value: [new Date(new Date().setDate(new Date().getDate() - 1)),new Date(new Date().setDate(new Date().getDate() - 1))],
      label: 'Yesterday'
    },{
    value: [new Date(new Date().setDate(new Date().getDate()-new Date().getDay()+1)),new Date(new Date().setDate(new Date().getDate()-new Date().getDay()+7))],
    label: 'This week'
  }, {
    value: [this.lastMonday,this.lastSunday],
    label: 'Last week'
  }, {
    value: [new Date(new Date().getFullYear(), new Date().getMonth(), 1),  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)],
    label: 'This Month'
  },
  {
    value: [new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),  new Date(new Date().getFullYear(), new Date().getMonth(), 0)],
    label: 'Last Month'
  },
  {
    value: [new Date(new Date().getFullYear(), 0, 1), new Date(new Date().getFullYear(), 11, 31)],
    label: 'This year'
  },
  {
    value: [new Date(new Date().getFullYear()-1, 0, 1), new Date(new Date().getFullYear()-1, 11, 31)],
    label: 'Last year'
  }];
  bsValue=this.ranges[0].value
  @ViewChild(BsDaterangepickerDirective, { static: false }) dateRangePicker: BsDaterangepickerDirective;
 date=new Date(new Date().setDate(new Date().getDate()))
  bsConfig={
    containerClass:"theme-white",
    displayOneMonthRange:false,
    showWeekNumbers:false ,
    adaptivePosition: true,
    dateInputFormat: 'YYYY-MM-DD',
    ranges: this.ranges,
    todayHighlight: true,
    preventChangeToNextMonth: false,  
    startView:2,
    customTodayClass:'custom-today-class',
    showPreviousMonth: false,
    returnFocusToInput: false 
  };
  constructor(private messageservie:MessageService,private gigaaaservice:GigaaaApiService) { }

  ngOnInit(): void {
    this.showselectedpanel("custom");
    this.getallthecountries();
    this.getlllangugaes();
  }
showselectedpanel(val)
{
  if(val=="main")
  {
    this.showmainfilters=false;
    this.showselectedrange=true;
    this.showlocationfilter=true;
    this.showlanguagefilter=true;
    this.showcustomdatefilter=true;
  }
  else if(val=="selectedrange"){
    this.showmainfilters=true;
    this.showselectedrange=false;
    this.showlocationfilter=true;
    this.showlanguagefilter=true;
    this.showcustomdatefilter=true;

  }
  else if(val=="location")
  {
    this.showmainfilters=true;
    this.showselectedrange=true;
    this.showlocationfilter=false;
    this.showlanguagefilter=true;
    this.showcustomdatefilter=true;

  }
  else if(val=="languages")
  {
    this.showmainfilters=true;
    this.showselectedrange=true;
    this.showlocationfilter=true;
    this.showlanguagefilter=false;
    this.showcustomdatefilter=true;

  }
  else if(val=="custom")
  {
    this.showmainfilters=true;
    this.showselectedrange=true;
    this.showlocationfilter=true;
    this.showlanguagefilter=true;
    this.showcustomdatefilter=false;
  }
}
 // get all country 
 public async getallthecountries(): Promise<void>
 {
  const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
  var accesstoken=getdata?.access_token;
  try{
    var data= await this.gigaaaservice.getAllCountries(accesstoken);
    console.log(data)
     this.countrylist=data;
     this.countrylist= this.countrylist.sort((a, b)=> {
      var textA = a.name;
      var textB = b.name;
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
  });
  }
  catch(err){
    this.messageservie.setErrorMessage(err.error.error);
  }
   

 }
 // get all languages
 public async getlllangugaes(): Promise<void>{
  const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
  var accesstoken=getdata.access_token;
  var subsid=getdata.subscription_id.subsid.uuid;
  const intid = JSON.parse(localStorage.getItem('intgid'))
  try{
   var languagee=[{name:'Arabic' ,status:false},
    {name:'English' ,status:false},
    {name:'German' ,status:false},
    {name:'Russian' ,status:false},
    {name:'Spanish' ,status:false},
    {name:'Turkish' ,status:false},

  ];
  var  language= await this.gigaaaservice.getAllLanguages(accesstoken,subsid,intid.int_id)
    let updatearr = language.map((item, i) => Object.assign({}, item, languagee[i]));
      console.log(updatearr)
     this.lang=updatearr;
     // this.getalllanguage(false);

  }
  catch(err){
    this.messageservie.setErrorMessage(err.error.error)
  }
}
}
