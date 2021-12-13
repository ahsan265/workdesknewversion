import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { gigaaasocketapi } from 'src/app/service/gigaaasocketapi.service';
import { MessageService } from 'src/app/service/messege.service';
import { sharedres_service } from 'src/app/service/sharedres.service';
import { CroppictureComponent } from '../croppicture/croppicture.component';
import { DeleteagentpopupComponent } from '../deleteagentpopup/deleteagentpopup.component';
import { UpdatepasswordComponent } from '../updatepassword/updatepassword.component';
declare var $: any;

@Component({
  selector: 'app-agentsettings',
  templateUrl: './agentsettings.component.html',
  styleUrls: ['./agentsettings.component.css']
})
export class AgentsettingsComponent implements OnInit {
profiledetals:boolean;
uploadpic:boolean;
displayname_languages:boolean;
administratorright:boolean;
password:boolean;
initationbtns:boolean;
deltebutton:boolean;
valuechanges:boolean=false;
profileforagent:boolean;
agentsettingdata:any;
agentfullname:any;
agentprofilepic:any;
idsoflanguages=[];
 isadmin:boolean = true;

  constructor(private gigaaaapi:GigaaaApiService, private message:MessageService,private sharedres:sharedres_service,public dialog: MatDialog) { }
 lang=[]
form = new FormGroup({
  
  first_name: new FormControl('', [
    Validators.required,
  ]),
  display_name: new FormControl('', [
    Validators.required,
  ]),
  last_name: new FormControl('', [
    Validators.required,
  ]),
  is_admin: new FormControl('', [
    Validators.required,
  ]),

 });

 selectedlanguages:any;
 allselectedtag:boolean;
  ngOnInit(): void {

    this.getlllangugaes();
    this.getagentprofilesettingview();
    this.updategaentprofilewith();
    this.recieveupdatedpicture();
  }
  selectsubscription(val)

  {

  }
   // get all langugaes
   getalllanguage(val)
   {
     var udpatedlang=[];
     this.lang.forEach(element=>{
      var index = this.idsoflanguages.indexOf(element.id);
      if (index !== -1) {
        this.idsoflanguages.splice(index, 1);

      }
     })
  if(val==true)
  {
    this.lang.forEach(element => {
       udpatedlang.push({name:element.name,status:true,id:element.id})
       this.idsoflanguages.push(element.id)
    });
    console.log(this.idsoflanguages)
    this.selectedlanguages=this.lang.length +"\xa0"+"Selected";
      if(this.lang.length==6)
      {
          this.selectedlanguages="All Selected"
          this.allselectedtag=true;
       //   this.updateagentprofile()
        this.sharedres.getrefreshagentlist(1);
      }
    
  }
  else if(val==false){
      this.lang.forEach(element => {
     udpatedlang.push({name:element.name,status:false,id:element.id})
     var index = this.idsoflanguages.indexOf(element.id);
      if (index !== -1) {
        this.idsoflanguages.splice(index, 1);
      }

      });
      console.log(this.idsoflanguages)
      this.selectedlanguages="Not Selected";
      this.allselectedtag=false;
      if(this.idsoflanguages.length!=0)
      { 
        //this.updateagentprofile()
        console.log("hello language")
        //this.sharedres.getrefreshagentlist(1);
  
      }
  }
    this.lang=udpatedlang;
   
   }

   selectlanguageonebyone(e,id)
   {
     if(e==true)
     {
       this.idsoflanguages.push(id);
       if(this.idsoflanguages.length==6)
       {
        this.selectedlanguages="All Selected";
        this.allselectedtag=true;
       }
       else{
        this.selectedlanguages=this.idsoflanguages.length +"\xa0"+"Selected";

       }
       if(this.idsoflanguages.length!=null)
    {
     // this.updateagentprofile()
   //   this.sharedres.getrefreshagentlist(1);

    }
     }
     else if(e==false)
     {
      var index = this.idsoflanguages.indexOf(id);
      if (index !== -1) {
        this.idsoflanguages.splice(index, 1);
       // this.updateagentprofile()

      }
      
      if(this.idsoflanguages.length==0)
      {
       this.selectedlanguages="Not Selected";

      }
      else{
       this.selectedlanguages=this.idsoflanguages.length +"\xa0"+"Selected";
       this.allselectedtag=false;
      }
 
     }
    
    

   }

   getbacktoteams()
   {   
    //  if(this.valuechanges==true)
    //  {
    //  }    
      this.idsoflanguages.length=0;
      // this.selectedlanguages=null;
      this.sharedres.getrefreshagentlist(1);
      this.getalllanguage(false);
      this.isadmin=undefined;

     this.sharedres.getagentsettingview("teams");
   }

   deleteagent() {
     var agentdata:{};
    const dialogRef = this.dialog.open(DeleteagentpopupComponent,{
      hasBackdrop:false,
      data:this.agentsettingdata,
      panelClass:"deleteagent-dialog-container",
    });
  }

  getagentprofilesettingview()
  {
    this.sharedres.agentsprofilesetting$.subscribe(data=>{
      this.agentsettingdata=data;
      this.showagentinformation(this.agentsettingdata);
      var timestamp = (new Date()).getTime();

       this.agentprofilepic=this.agentsettingdata?.image + '?_=' + timestamp;
      console.log(data)
      if(data.invited==true)
      {
        this.profiledetals=false;
        this.uploadpic=false;
        this.displayname_languages=false;
        this.administratorright=false;
        this.profileforagent=false;
        this.initationbtns=false;
        this.deltebutton=true;
        this.agentfullname= "Not joined yet	";
        this.password=true;
      }
      if(data.invited==false)
      {
        this.profiledetals=false;
        this.uploadpic=false;
        this.displayname_languages=false;
        this.administratorright=false;
        this.profileforagent=false;
        this.initationbtns=true;
        this.getdeletebutton(data.email);
        this.password=true;
        this.agentfullname=this.agentsettingdata.first_name+"\xa0"+this.agentsettingdata.last_name
      }
      const getdata = JSON.parse(localStorage.getItem('gigaaa-user'))
      console.log(this.agentsettingdata?.email,getdata.email)
    if(this.agentsettingdata?.email!=getdata?.email)
    {
      this.form.controls["first_name"].disable();
      this.form.controls["last_name"].disable();
    }
    else if(this.agentsettingdata?.email==getdata?.email)
    {
      this.form.controls["first_name"].enable();
      this.form.controls["last_name"].enable();
      this.password=false;
    }
    })
  }

  getdeletebutton(agentemail)
  {
     const getdata = JSON.parse(localStorage.getItem('gigaaa-user'))
     if(getdata.email==agentemail)
     {
       this.deltebutton=true;

     }
     else{
       this.deltebutton=false;

     }
  }
  showagentname(){
   if(this.agentsettingdata.invited==true)
   {
     return "Not joined yet	"
   }
   else if(this.agentsettingdata.invited==false)
   {
     return this.agentsettingdata.first_name+"\xa0"+this.agentsettingdata.last_name
   }
  }
 

  // update password popup
   updatepasswordpopup()
   {
    const dialogRef = this.dialog.open(UpdatepasswordComponent,{
      hasBackdrop:false,
      panelClass:"password-form-container",
    });
   }
  // cancel invitation 
  public async cancelagentinvitation(): Promise<void>
  {  const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
      var accesstoken=getdata.access_token;
      var subsid=getdata.subscription_id.subsid.uuid;
      const intg_id = JSON.parse(localStorage.getItem('intgid'))
     console.log(this.agentsettingdata?.agentuuid);
    try{
    await  this.gigaaaapi.deleteagent(accesstoken,subsid,intg_id?.int_id,this.agentsettingdata?.agentuuid);
      // this.sharedres.getrefreshagentlist(1);
      // this.sharedres.getagentsettingview("teams");

      this.message.setSuccessMessage("Agent invitation canceled");
      this.getbacktoteams();
    
    }
    catch(err)
    {
      console.log(err)
      this.message.setErrorMessage(err.error.error);
    }
  }

  // resend invitation 
  public async invitationresendagent(): Promise<void>
  {  const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
      var accesstoken=getdata.access_token;
      var subsid=getdata.subscription_id.subsid.uuid;
      const intg_id = JSON.parse(localStorage.getItem('intgid'))
     
    try{
    await  this.gigaaaapi.resendinvitation(accesstoken,subsid,intg_id?.int_id,this.agentsettingdata?.agentuuid);
      this.sharedres.getrefreshagentlist(1);
      this.sharedres.getagentsettingview("teams");
      this.message.setSuccessMessage("Agent Invitation has been resent.");
    
    }
    catch(err)
    {
      console.log(err)
      this.message.setErrorMessage(err.error.error);
    }
  }
  // set isadmins status
  // getisadmin(val)
  // {
  //   console.log(val)
  //   if(val==true)
  //   {
  //     this.isadmin=true;
  //     this.updategaentprofilewith()

  //   }
  //   else if(val==false){
  //     this.isadmin=false;
  //     this.updategaentprofilewith()

  //   }
  // }
  // show agent information

  showagentinformation(val)
  {    

    if(val?.role=="Admin")
    {
      this.isadmin=true;
    }
    else if(val?.role=="Agent"){
      this.isadmin=false;

    }
    var admin;
    if(this.isadmin==false){
      admin=true
    }
    else if(this.isadmin==true)
    {
      admin=false
    }
    this.form.patchValue({
      first_name:val.first_name,
      last_name:val.last_name,
      display_name:val.display_name,
      is_admin:admin
    },{emitEvent: false, onlySelf: true});
    val.language_ids
  this.getselectedlanguages(val.language_ids)

  }
   // get load ids of languages

   getselectedlanguages(val:Array<any>)
   {    
         
          val.forEach(ele=>{
          var  index = this.lang.findIndex(x => x.id ==ele.id);
          this.idsoflanguages.push(ele.id)
          console.log(index)
          this.lang[index].status=true;
         
       });
     this.selectedlanguages=this.idsoflanguages.length +"\xa0"+"Selected";
      if(this.idsoflanguages.length==6)
      {
          this.selectedlanguages="All Selected"
          this.allselectedtag=true;
      }

   }
  
  // updateagentprofile
 
  updategaentprofilewith()
  {

    this.form.valueChanges.subscribe(data=>{
     // console.log(data)
     if(this.idsoflanguages.length!=0)
     {
  
     }
      
    })
  }
  // update profile
public async updateagentprofile(): Promise<any>
  {
    const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
      var accesstoken=getdata.access_token;
      var subsid=getdata.subscription_id.subsid.uuid;
      const intg_id = JSON.parse(localStorage.getItem('intgid'))
    try{
      var data={"display_name": this.form.controls.display_name.value, "language_ids": this.idsoflanguages, "first_name": this.form.controls.first_name.value, "last_name": this.form.controls.last_name.value, "admin": !this.form.controls.is_admin.value}
      if(data?.first_name==""||data?.last_name=="")
      {
        this.message.setErrorMessage("Please fill out fields.");

      } else{
        await  this.gigaaaapi.updateagentsettings(accesstoken,subsid,intg_id.int_id,this.agentsettingdata?.agentuuid,data);
        this.valuechanges=true;
        this.message.setSuccessMessage("All Changes Saved");
      }
 
    
    }
    catch(err)
    {     

      this.message.setErrorMessage(err.error.error);
    }
  }

  // update agent profile pic
  uploadpicture(){
   
      const getdata = JSON.parse(localStorage.getItem('gigaaa-user'))
      var data={
       loggedinemail:getdata?.email,useremail:this.agentsettingdata?.email,uuid:this.agentsettingdata?.agentuuid
      }
  
        this.dialog.open(CroppictureComponent,{
          hasBackdrop:true,
          panelClass:"croppicture-dialog-container",
          data:data
        });
      
 
//     const getdata = JSON.parse(localStorage.getItem('gigaaa-user'))
// console.log(this.agentsettingdata?.email)
//     if(this.agentsettingdata?.email!=getdata?.email)
//     {
// this.agentupdateuserprofilepic(file[0],this.agentsettingdata?.agentuuid)
//     }
//     else 
//     {
// this.updateuserprofilepic(file[0])
//     }
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
    var  language= await this.gigaaaapi.getAllLanguages(accesstoken,subsid,intid.int_id)
      let updatearr = language.map((item, i) => Object.assign({}, item, languagee[i]));
        console.log(updatearr)
        this.lang=updatearr;
       // this.getalllanguage(false);

    }
    catch(err){
      this.message.setErrorMessage(err.error.error)
    }
  }

  // recieve updated picture
  recieveupdatedpicture()
  {
    this.sharedres.sendpicture$.subscribe(data=>{
      console.log(data)
      var timestamp = (new Date()).getTime();
      this.agentprofilepic=data + '?_=' + timestamp;
    })
  }
}
