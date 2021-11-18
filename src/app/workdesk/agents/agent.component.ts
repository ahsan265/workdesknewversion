import { toBase64String } from '@angular/compiler/src/output/source_map';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransitionCheckState } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { interval } from 'rxjs';
import { agentsocketapi } from 'src/app/service/agentsocketapi';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { MessageService } from 'src/app/service/messege.service';
import { sharedres_service } from 'src/app/service/sharedres.service';
import { AddagentComponent } from '../addagent/addagent.component';
import { EditformComponent } from '../editform/editform.component';
import { InviteagentComponent } from './inviteagent/inviteagent.component';
declare var $: any;
@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css'],
})

export class AgentComponent implements OnInit {
  languagetag:any;
  languageflag:any;
  langid:any;
  totalnumberofagent:any;
  intgg:any;
  all_agent:any;
  tobefilteragent:any;
  alllanguage=[];
  idoflang=[];
  idofintg=[];
  allintegration=[];
  intgrationid:any;
  agentrole:any;
  isagent:any;
  selectedusername:any;
  id_soflanguages=[];
  selectedlanguages:any;
  allselectedtag:boolean;
  listofuser=[{name:'Show all' ,status:true},
  {name:'Active' ,status:false},
  {name:'Inactive' ,status:false},
  {name:'Invited' ,status:false}];

  language=[{name:'Arabic' ,status:true},
  {name:'English' ,status:false},
  {name:'German' ,status:false},
  {name:'Russina' ,status:false},
  {name:'Spanish' ,status:false},
  {name:'Turkish' ,status:false}

];

  languages = [
    { name: 'ARABIC', id: 6, image:"/assets/language/flag-of-Egypt.png" },
    { name: 'ENGLISH', id: 56, image: "/assets/language/flag-of-United-Kingdom.png" },
    { name: 'GERMAN', id: 83, image: "/assets/language/flag-of-Germany.png" },
    { name: 'RUSSIAN', id: 131, image:"/assets/language/flag-of-Russia.png" },
    { name: 'TURKISH', id: 175,image: "/assets/language/flag-of-Turkey.png" }
  ];
  searchText

  integration:any;
  agentsetting:any;
  agentlistview:any;
  agentlist:any;
  noagent:any;

  timestamp:any;
  lang=[];
  active_agents:any;
  inactive_agents:any;
  invited_agents:any;
  all_agents:any;

  allagentmsg:any;
  allactiveagentmsg:any;
  allinvitedagentmsg:any;
  allinactiveagetnmsg:any;
  constructor(private changeDetector: ChangeDetectorRef,
     private sharedres:sharedres_service,
     public dialog: MatDialog,
     private gigaaaapi:GigaaaApiService,
     private agentsocketgigaaaapi:agentsocketapi,private messageservie:MessageService) { }
  transform(value: any, ...args: any[]) {
    throw new Error('Method not implemented.');
  }
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)
    ]),
    language_ids: new FormControl('', [
      Validators.required,Validators.minLength(6)
    ]),
    display_name: new FormControl('', [
      Validators.required,Validators.minLength(6)
    ]),
    role: new FormControl('', [
      Validators.required,
    ]),
    integration_ids: new FormControl('', [
      Validators.required,
    ]),
   });

  ngOnInit(): void {
    this.getlllangugaes();    
    this.sharedres.getuserole();
    this.agentsetting=true;
    this.agentlistview=false;
    this.agentlist=false;
    this.noagent=true;
    this.getagentviews();
    this.getlistofagentwithintg();
    this.getagentlist();
    this.getagentrole();
   setTimeout(() => {
    this.selectusertype(true,"Show all",0)

   }, 500);

    this.sharedres.submitapplication$.subscribe(data=>{
    this.getallagents(data?.int_id,this.active_agents,this.inactive_agents,this.invited_agents,this.id_soflanguages);
    })
    this.getagentdetailslive()

  }
  // get agents details live
  getagentdetailslive(){
  this.agentsocketgigaaaapi.getagetnlist$.subscribe(data=>{
    var updateagentdata;
    updateagentdata =data;
     updateagentdata.forEach(element => {
       if(element.email==this.getsettingforloggedinagent())
       {
         var fromindex =updateagentdata.findIndex(x => x.email ===this.getsettingforloggedinagent());
         var selectedobject=updateagentdata[fromindex];
         updateagentdata.splice(fromindex, 1);
         updateagentdata.splice(0, 0, selectedobject);
       }
     });
 this.tobefilteragent=data;
 this.totalnumberofagent=data['length'];
 if(this.totalnumberofagent==0)
 {
   this.agentlist=true;
   this.noagent=false;
 }
 else{
   this.agentlist=false;
   this.noagent=true;
   this.all_agent=data;
 }
  });
  }
  counter(u: number) {
    return new Array(u);
  }


  getlistofagentwithintg()
  {
    const intg_id = JSON.parse(localStorage.getItem('intgid'))
    this.getallagents(intg_id?.int_id,1,1,1,this.id_soflanguages)

  }
  geteditagent(val)

  { console.log(val)
    this.dialog.open(EditformComponent,{
      hasBackdrop:true,
      panelClass:"edit-form-container",
      data :{"role":val.role,'id':val.id,"name":val.display_name,"agentlanguages":val.languages,"agentintegrations":val.integrations}
    });
  }

  getengamentofagentcall(val)
  {
    if(val=="inchat")
    {
      return '../../../assets/assets_workdesk/chat.svg';
    }
   else  if(val=="incall")
    {
      return '../../../assets/assets_workdesk/call.svg';
    }
  }
 getsettingforloggedinagent()
 {
   
    const getdata = JSON.parse(localStorage.getItem('gigaaa-user'))
   return getdata.email;  
   
  
 }

 // get row of loggedin user at top 
 getloggedinuserattop(email)
 {
    if(this.getsettingforloggedinagent()==email)
  {    

    return 0;
  }
  }
  addagent()
  {
    this.dialog.open(AddagentComponent,{
      hasBackdrop:true,
      panelClass:"addagent-form-container",
    });
  }
  public  getallagents(intid,parma1,param2,param3,lang) {

    try {
      const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
      var accesstoken=getdata.access_token;
       var subsid=getdata.subscription_id.subsid.uuid
    
        this.gigaaaapi.getallagents(accesstoken,subsid,intid,parma1,param2,param3,lang).subscribe(data=>{
          console.log(data)
           var updateagentdata;
           updateagentdata =data;
            updateagentdata.forEach(element => {
              if(element.email==this.getsettingforloggedinagent())
              {
                var fromindex =updateagentdata.findIndex(x => x.email ===this.getsettingforloggedinagent());
                var selectedobject=updateagentdata[fromindex];
                updateagentdata.splice(fromindex, 1);
                updateagentdata.splice(0, 0, selectedobject);
              }
            });
        this.tobefilteragent=data;
        this.totalnumberofagent=data['length'];
        if(this.totalnumberofagent==0)
        {
          this.agentlist=true;
          this.noagent=false;
        }
        else{
          this.agentlist=false;
          this.noagent=true;
          this.all_agent=data;
        }
        })
    } catch (error) {
      this.handleLoginRegisterError(error.error.error);
    }
  }
  public async assignrole(): Promise<void>
  {          this.idoflang=this.idoflang.filter((value,index)=>this.idoflang.indexOf(value)===index)
    this.idofintg=this.idofintg.filter((value,index)=>this.idofintg.indexOf(value)===index)
    const data = {
      assignrole: {
        email: this.form.value.email,
        role: this.form.value.role,
        display_name:this.form.value.display_name="Ahsan",
        language_ids:this.idoflang,
        integration_ids: this.idofintg
      }
    }
    console.log(data);
    const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
    var accesstoken=getdata.access_token;
    var subsid=getdata.subscription_id.subsid.uuid
    try
    {
     await this.gigaaaapi.assignrole(accesstoken,subsid,data.assignrole)
     // this.getallagents("");
    }
    catch(error) {
      
      this.handleLoginRegisterError(error);
    }

   
  }
// check agent is online
isagentonline(val){
 if(val==true)
 {
   return '#2FDE13'
 }
 else if(val==false)
 {
   
    '#FF155A';
 }
}
  

  getlanguage(lang,img,id)
  {
    this.languagetag=lang;
    this.languageflag=img;
    this.langid=id;
    this.addlanguages(id);
  }
  getintegration(val,id)
  {
    this.intgg=val;
    this.adintegration(id)
  }
  addlanguages(val)
  {
    var objectlang=this.languages.find((x => x.id==val))
    this.alllanguage.push(objectlang)
    this.idoflang.push(objectlang.id)
    this.alllanguage=this.alllanguage.filter((value,index)=>this.alllanguage.indexOf(value)===index)

  }

  adintegration(val)
  {
    var objectintg=this.integration.find((x => x.id==val))

    this.allintegration.push(objectintg)
    this.idofintg.push(objectintg.id)
    this.allintegration=this.allintegration.filter((value,index)=>this.allintegration.indexOf(value)===index)
  }
  removeallintgfromarray(val)
  {
    this.allintegration=this.allintegration.filter(({ id }) => id !== val);
    this.idofintg=this.idofintg.filter( (val)  => val !== val);
    console.log(this.idofintg);
  } 
  removealanguagefromarray(val)
  {    this.idoflang=this.idoflang.filter( (val)  => val !== val);
    
    this.alllanguage=this.alllanguage.filter(({ id }) => id !== val);
  }
  addintegration()
  {
    this.intgg;
  }

  private handleLoginRegisterError(response: any) {
    console.log(response)
        this.messageservie.setErrorMessage(response.error.error, 'toast-bottom-right');
  }
  // get pictures
  getpicture(val)
  {  
      var timestamp = new Date().getTime();
      var img=val+ '?_=' + timestamp;
     // this.changeDetector.markForCheck()
      return img;
  }
  //new code 

  selectusertype(e,val,status)
  { const intid = JSON.parse(localStorage.getItem('intgid'))
    this.selectedusername=val;
  if(e==true&& val=="Show all")
  {
   
    this.active_agents=1;
    this.inactive_agents=1;
    this.invited_agents=1;
    this.allagentmsg="There is no agents invited to this integration yet.";
    if(status!=1)
    {
      this.getallagents(intid?.int_id,1,1,1,this.id_soflanguages);
      this.agentsocketgigaaaapi.send_agentsparam_status(1,1,1,this.id_soflanguages)

    }
   
  }
  else if(e==true&& val=="Active")
  {     this.allagentmsg="There is no Active Agents yet";
 
    if(status!=1)
    {    
      this.getallagents(intid?.int_id,1,0,0,this.id_soflanguages);
      this.agentsocketgigaaaapi.send_agentsparam_status(1,0,0,this.id_soflanguages)

    }

    this.active_agents=1;
    this.inactive_agents=0;
    this.invited_agents=0;
  }
  else if(e==true&& val=="Inactive")
  { this.allagentmsg="There is no Inactive Agents yet";
 
    if(status!=1)
    {
    this.getallagents(intid?.int_id,0,0,1,this.id_soflanguages);
    this.agentsocketgigaaaapi.send_agentsparam_status(0,0,1,this.id_soflanguages)
    }
    this.active_agents=0;
    this.inactive_agents=0;
    this.invited_agents=1;
  }
  else if(e==true&& val=="Invited")
  {if(status!=1)
    {
    this.getallagents(intid?.int_id,0,1,0,this.id_soflanguages);
    this.agentsocketgigaaaapi.send_agentsparam_status(0,1,0,this.id_soflanguages)
    }
    this.active_agents=0;
    this.inactive_agents=1;
    this.invited_agents=0;
  }
  $('li.user').on('click', function () {
    var isActive = $('#accordian',).toggleClass('is-active');
  if(isActive){
      $('.submenuu').removeClass("is-active").css('display', 'none');
  }
  });
  }


  Invtieteagentpopup() {
    const dialogRef = this.dialog.open(InviteagentComponent,{
      hasBackdrop:false,
      panelClass:"addagent-dialog-container",
    });
  }

  getsettingspage(images,email,invited,displayName,firstname,lastname,languageids,role,useruuid){
    this.agentsetting=false;
    this.agentlistview=true;
     this.agentlist=true
    var data={image:images,email:email,invited:invited,display_name:displayName,first_name:firstname,last_name:lastname,language_ids:languageids,role:role,agentuuid:useruuid}
   console.log(data)
    if(data.invited==true)
    {
      this.sharedres.getagentprofilesetting(data);

    }
    else if(data.invited==false)
    {
      this.sharedres.getagentprofilesetting(data);

    }
  }



  getagentviews()
  {
    this.sharedres.agentsetting$.subscribe(data=>{
      if(data=="teams")
      {
        this.agentlistview=false;
        this.agentlist=false;
        this.agentsetting=true;

      }
      else {
        this.agentsetting=false;
        this.agentlistview=true;
        this.agentlist=true;

      }
    })
  }
// get agent name 
getagentname(val)
{
  if(val!="")
  {
    return val;
  }
  else 
  {
    return 'N/A';
  }
}
  //getsettingsview
  getagentrole()
   {
    this.sharedres.agentrole$.subscribe(data=>{
      this.isagent=data['is_admin']
    console.log(data)
    if ( data['is_admin']==true)
    {
      this.agentrole="/assets/assets_workdesk/edit.svg"
    }
    else if(data['is_admin']==false){
      this.agentrole="/assets/assets_workdesk/edit.svg"
      
    }
    })
}


  // get invieted or active agent list
  getinvitedagents(invited,inactive,active)
  {
 if(invited==true&&inactive==false&&active==false)
 {
  return '#949CA8';

 }
 else{
 return false;
 }

  }
  // get full name
  getfullname(invited,inactive,active,first_name,last_name)
  {
 if(invited==true&&inactive==false&&active==false)
 {
   return "Not joined yet";
 }
 else{
return first_name+"\xa0"+last_name;
 }

  }
  notjoinedtextitalic(invited,inactive,active)
  {
   if(invited==true&&inactive==false&&active==false)
   {
     return { 'font-style': 'italic'};
   } 
  }
  gethidenameandimage(invited,inactive,active,email)
  {
 if(invited==true&&inactive==false&&active==false)
 {
   return true;
 }
 else if(invited==false &&inactive==false&&active==true){
return false;
 }

  }

  // refresh agent list

  getagentlist()
  {
    this.sharedres.refreshagentlist$.subscribe(data=>{
      if(data==1)
      {
        
        const intid = JSON.parse(localStorage.getItem('intgid'))
        this.getallagents(intid?.int_id,this.active_agents,this.inactive_agents,this.invited_agents,this.id_soflanguages);
        this.agentsocketgigaaaapi.send_agentsparam_status(this.active_agents,this.inactive_agents,this.invited_agents,this.id_soflanguages)

      }
    })
  }

  // get languages api
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
    ];
    var  language= await this.gigaaaapi.getAllLanguages(accesstoken,subsid,intid.int_id)
      let updatearr = language.map((item, i) => Object.assign({}, item, languagee[i]));
        console.log(updatearr)
        this.lang=updatearr;
       this.getalllanguage(true);

    }
    catch(err){
      this.messageservie.setErrorMessage(err.error.error)
    }
  }
  
     // get all langugaes
     getalllanguage(val)
     {
      const intid = JSON.parse(localStorage.getItem('intgid'));
       var udpatedlang=[];
       this.lang.forEach(element=>{
        var index = this.id_soflanguages.indexOf(element.id);
        if (index !== -1) {
          this.id_soflanguages.splice(index, 1);
  
        }
       })
    if(val==true)
    {    

      this.lang.forEach(element => {
         udpatedlang.push({name:element.name,status:true,id:element.id})
         this.id_soflanguages.push(element.id)
      });

      
      console.log(this.id_soflanguages)
      this.selectedlanguages=this.lang.length +"\xa0"+"Selected";
        if(this.lang.length==6)
        {
            this.selectedlanguages="All Selected"
            this.allselectedtag=true;
           // this.updateagentprofile()
           // this.sharedres.getrefreshagentlist(1);
           if(this.all_agent!=null)
           {
            this.getallagents(intid?.int_id,this.active_agents, this.inactive_agents,this.invited_agents,this.id_soflanguages);
           // this.agentsocketgigaaaapi.send_agentsparam_status(this.active_agents,this.inactive_agents,this.invited_agents,this.id_soflanguages)

           }

        }
      
    }
    else if(val==false){
        this.lang.forEach(element => {
       udpatedlang.push({name:element.name,status:false,id:element.id})
       var index = this.id_soflanguages.indexOf(element.id);
        if (index !== -1) {
          this.id_soflanguages.splice(index, 1);
        }
  
        });
        console.log(this.id_soflanguages)
        this.selectedlanguages="Not Selected";
        this.allselectedtag=false;
        if(this.id_soflanguages.length!=0)
        {
          //this.updateagentprofile()
          this.getallagents(intid?.int_id,this.active_agents, this.inactive_agents,this.invited_agents,this.id_soflanguages);
         // this.agentsocketgigaaaapi.send_agentsparam_status(this.active_agents,this.inactive_agents,this.invited_agents,this.id_soflanguages)

    
        }
    }
      this.lang=udpatedlang;
     
     }
     selectlanguageonebyone(e,id)
   {      const intid = JSON.parse(localStorage.getItem('intgid'));

     if(e==true)
     {
       this.id_soflanguages.push(id);
       if(this.id_soflanguages.length==6)
       {
        this.selectedlanguages="All Selected";
        this.allselectedtag=true;
       }
       else{
        this.selectedlanguages=this.id_soflanguages.length +"\xa0"+"Selected";

       }
       if(this.id_soflanguages.length!=null)
    {
     // this.updateagentprofile()
     this.getallagents(intid?.int_id,this.active_agents, this.inactive_agents,this.invited_agents,this.id_soflanguages);
     this.agentsocketgigaaaapi.send_agentsparam_status(this.active_agents,this.inactive_agents,this.invited_agents,this.id_soflanguages)

    }
     }
     else if(e==false)
     {
      var index = this.id_soflanguages.indexOf(id);
      if (index !== -1) {
        this.id_soflanguages.splice(index, 1);
      //  this.updateagentprofile()
      this.getallagents(intid?.int_id,this.active_agents, this.inactive_agents,this.invited_agents,this.id_soflanguages);
      this.agentsocketgigaaaapi.send_agentsparam_status(this.active_agents,this.inactive_agents,this.invited_agents,this.id_soflanguages)

      }
      
      if(this.id_soflanguages.length==0)
      {
       this.selectedlanguages="Not Selected";
       this.getallagents(intid?.int_id,this.active_agents, this.inactive_agents,this.invited_agents,this.id_soflanguages);
       this.agentsocketgigaaaapi.send_agentsparam_status(this.active_agents,this.inactive_agents,this.invited_agents,this.id_soflanguages)

      }
      else{
       this.selectedlanguages=this.id_soflanguages.length +"\xa0"+"Selected";
       this.allselectedtag=false;
      }
 
     }
   

   }
   search(term:string) {

      var result = this.tobefilteragent.filter(obj => {
        if(obj['display_name']!=null)
        {
          return obj['display_name'].toLowerCase().includes(term.toLowerCase())||obj['email'].toLowerCase().includes(term.toLowerCase());

        }
        else  if(obj['display_name']==null)
        {
          return obj['email'].toLowerCase().includes(term.toLowerCase());

        }
      })
      this.all_agent=result;
      this.totalnumberofagent=this.all_agent['length'];
      if(term.length==0 )
      {
        this.all_agent=this.tobefilteragent;
        this.totalnumberofagent=this.tobefilteragent['length'];

      }
    }
 
 
}
