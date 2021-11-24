import { Component, OnInit } from '@angular/core';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { gigaaasocketapi } from 'src/app/service/gigaaasocketapi.service';
import { MessageService } from 'src/app/service/messege.service';

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
  countrylist:any;
  lang:any;
  constructor(private messageservie:MessageService,private gigaaaservice:GigaaaApiService) { }

  ngOnInit(): void {
    this.showselectedpanel("location");
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
  }
  else if(val=="selectedrange"){
    this.showmainfilters=true;
    this.showselectedrange=false;
    this.showlocationfilter=true;
    this.showlanguagefilter=true;
  }
  else if(val=="location")
  {
    this.showmainfilters=true;
    this.showselectedrange=true;
    this.showlocationfilter=false;
    this.showlanguagefilter=true;
  }
  else if(val=="languages")
  {
    this.showmainfilters=true;
    this.showselectedrange=true;
    this.showlocationfilter=true;
    this.showlanguagefilter=false;
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
