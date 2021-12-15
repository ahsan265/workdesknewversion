import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BsDaterangepickerDirective } from 'ngx-bootstrap/datepicker';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { MessageService } from 'src/app/service/messege.service';
import { sharedres_service } from 'src/app/service/sharedres.service';
import { MobilefiltersforagentsComponent } from '../../mobilefiltersforagents/mobilefiltersforagents.component';
interface IRange {
  value: Date[];
  label: string;
}
@Component({
  selector: 'app-call-mobile-popup-filter',
  templateUrl: './call-mobile-popup-filter.component.html',
  styleUrls: ['./call-mobile-popup-filter.component.css']
})
export class CallMobilePopupFilterComponent implements OnInit {
searchpanel:boolean=false;
languagepanel:boolean=false;
locationpanel:boolean=false;
daterangepanel:boolean=false;

  showmainfilters:boolean=false;
  showselectedrange:boolean=false;
  showlocationfilter:boolean=false;
  showsearchfilter:boolean=false;
  showlanguagefilter:boolean=false;
  showcustomdatefilter:boolean=false;
  countrylist:any;
  rangeSelected:any;
  datepreviewstart:any;
  datepreviewend:any;
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
  constructor(private messageservie:MessageService,
    private gigaaaservice:GigaaaApiService,
    public dialogRef: MatDialogRef<MobilefiltersforagentsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private shared_res:sharedres_service) 
    { }

  form = new FormGroup({
    search: new FormControl('', [
      Validators.required,
    ]),
   });

  ngOnInit(): void {
    this.showcalltypepanel();
    this.showselectedpanel("main");
    this.getallthecountries();
    this.getlllangugaes();
    this.onDateChange([this.ranges[0].value[0],this.ranges[0].value[1]]);

  }
showselectedpanel(val)
{
  if(val=="main")
  {
    this.showmainfilters=false;
    this.showselectedrange=true;
    this.showsearchfilter=true;
    this.showlanguagefilter=true;
    this.showcustomdatefilter=true;
    this.showlocationfilter=true;
  }
  else if(val=="selectedrange"){
    this.showmainfilters=true;
    this.showselectedrange=false;
    this.showsearchfilter=true;
    this.showlanguagefilter=true;
    this.showcustomdatefilter=true;
    this.showlocationfilter=true;


  }
  else if(val=="location")
  {
    this.showmainfilters=true;
    this.showselectedrange=true;
    this.showsearchfilter=true;
    this.showlanguagefilter=true;
    this.showcustomdatefilter=true;
    this.showlocationfilter=false;


  }
  else if(val=="languages")
  {
    this.showmainfilters=true;
    this.showselectedrange=true;
    this.showsearchfilter=true;
    this.showlanguagefilter=false;
    this.showcustomdatefilter=true;
    this.showlocationfilter=true;


  }
  else if(val=="custom")
  {
    this.showmainfilters=true;
    this.showselectedrange=true;
    this.showsearchfilter=true;
    this.showlanguagefilter=true;
    this.showcustomdatefilter=false;
    this.showlocationfilter=true;

  }
  else if(val=="search")
  {
    this.showmainfilters=true;
    this.showselectedrange=true;
    this.showsearchfilter=false;
    this.showlanguagefilter=true;
    this.showcustomdatefilter=true;
    this.showlocationfilter=true;

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
 //selectionpanel for selecting the panes
 onDateChange(event: Array<Date>)
 { 
       console.log(event)
       var ismatched=false;
       var d = new Date(event[0]);
       var d1 = new Date(event[1]);
     this.ranges.filter(x=>{
     if(x.value[0].toDateString()==d.toDateString()&&x.value[1].toDateString()==d1.toDateString())
       {
         this.rangeSelected=x.label
         var  month = '' + (d.getMonth() + 1);
         var   day = '' +(d.getDate());
         var  year = d.getFullYear();
   
       if (month.length < 2) 
        {
         month = '0' + month;
   
        }
       if (day.length < 2) 
         {
           day = '0' + day;
   
         }
         var dateStart1= [day,month,year].join('/');
         var  month1 = '' + (d1.getMonth() + 1);
       var   day1 = '' +( d1.getDate());
       var  year1 = d1.getFullYear();
 
     if (month1.length < 2) 
      {
       month1 = '0' + month1;
 
      }
     if (day1.length < 2) 
       {
         day1 = '0' + day1;
 
       }
       var dateEnd1= [day1,month1,year1].join('/');
         this.datepreviewstart=dateStart1;
         this.datepreviewend=dateEnd1;
         ismatched=true;
        
        //   $('.btn').addClass('.selected');
       
       }
     })
     if(ismatched==false)
     {
       var  month = '' + (d.getMonth() + 1);
       var   day = '' +(d.getDate());
       var  year = d.getFullYear();
 
     if (month.length < 2) 
      {
       month = '0' + month;
 
      }
     if (day.length < 2) 
       {
         day = '0' + day;
 
       }
       var dateStart= [day,month,year].join('/');
 
       var  month1 = '' + (d1.getMonth() + 1);
       var   day1 = '' +( d1.getDate());
       var  year1 = d1.getFullYear();
 
     if (month1.length < 2) 
      {
       month1 = '0' + month1;
 
      }
     if (day1.length < 2) 
       {
         day1 = '0' + day1;
 
       }
       var dateEnd= [day1,month1,year1].join('/');
 
       this.rangeSelected= dateStart+ " -"+ dateEnd;
       this.datepreviewstart=dateStart;
       this.datepreviewend=dateEnd;
           
     }

 }
   // send search query
   send_search_query()
   {    if(this.form.get('search').value!="")
        {
        //  this.shared_res.sendsearchquery(this.form.get('search').value)
        }
        else{
         // this.shared_res.sendsearchquery('')

        }
   }

   showcalltypepanel()
   {  let type=this.data.call_type;
     if(type=="incoming"||type=="outgoing")
     {
      this.searchpanel=false;
      this.languagepanel=false;
      this.locationpanel=true;
      this.daterangepanel=true;
     }
     else  if(type=="missed"||type=="answered"){
      this.searchpanel=false;
      this.languagepanel=false;
      this.locationpanel=true;
      this.daterangepanel=false;
     }
   }
}
