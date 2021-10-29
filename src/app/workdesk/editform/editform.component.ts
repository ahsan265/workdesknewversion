import { Inject, VERSION } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { MessageService } from 'src/app/service/messege.service';
import { SiginComponent } from 'src/app/useraccount/sigin/sigin.component';

@Component({
  selector: 'app-editform',
  templateUrl: './editform.component.html',
  styleUrls: ['./editform.component.css']
})
export class EditformComponent implements OnInit {
  languagetag:any;
  languageflag:any;
  intgg:any;
  alllanguage=[];
  idoflang=[];
  idofintg=[];
  allintegration:any;
  all_agent:any;
  langid:any;
  agenttype:boolean;
  

  languages = [
    { name: 'ARABIC', id: 6, image:"/assets/language/flag-of-Egypt.png" },
    { name: 'ENGLISH', id: 56, image: "/assets/language/flag-of-United-Kingdom.png" },
    { name: 'GERMAN', id: 83, image: "/assets/language/flag-of-Germany.png" },
    { name: 'RUSSIAN', id: 131, image:"/assets/language/flag-of-Russia.png" },
    { name: 'TURKEY', id: 175,image: "/assets/language/flag-of-Turkey.png" }
  ];
  integration:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {id: number,role: string,name: string,agentintegrations: Array<any>,agentlanguages: Array<any>},private gigaaaapi:GigaaaApiService,
  private  message:MessageService,
  public dialogRef: MatDialogRef<EditformComponent> ) {    this.getallintegrationlist()
  }
  form = new FormGroup({
 
  
    role: new FormControl('', [
      Validators.required,
    ]),
  
   });
  ngOnInit(): void {

    this.languagetag='ENGLISH';
    this.languageflag='/assets/language/flag-of-United-Kingdom.png';
    this.getlangandintg();
  
    console.log(this.data);
  }

  getallintegrationlist()
  {
   try {
    const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
    var accesstoken=getdata.access_token;
    var subsid=getdata.subscription_id.subsid.uuid
     this.gigaaaapi.getallintegration(accesstoken,"").subscribe(data=>{
       this.allintegration=data
     this.integration=data;
     console.log(data);
     this.intgg=this.allintegration[0].name;
     })
   } catch (error) {
     this.handleLoginRegisterError(error);
   }
  }

  getlangandintg()
  {
    this.data.agentlanguages.forEach(element => {
      var lang  = this.languages.find(item => item.id==element.id); 
       this.alllanguage.push(lang)
       this.idoflang.push(lang.id)

    });
    this.data.agentintegrations.forEach(element => {
      this.idofintg.push(element.id)
      
      var intg  = this.integration.find(item => item.id==element.id); 
      console.log(intg)

       this.integration.push(intg)
       this.idofintg.push(intg.id)
       
    });
  }

  public async geteditdataofagent(): Promise<void>
  {
    try
      { this.idoflang=this.idoflang.filter((value,index)=>this.idoflang.indexOf(value)===index)
        this.idofintg=this.idofintg.filter((value,index)=>this.idofintg.indexOf(value)===index)
        const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
        var accesstoken=getdata.access_token;
        var subsid=getdata.subscription_id.subsid.uuid
        console.log(this.idofintg)
if(this.form.value.role=="")
{
  this.handlerrormessage("Please Select Role");

}else{
  var data={agentdata:{"role": this.form.value.role, "display_name": this.data.name,  "language_ids": this.idoflang,"Integration_ids": this.idofintg}}
        await this.gigaaaapi.editagent(accesstoken,subsid,this.data.id,data.agentdata);
          this.dialogRef.close();
}
     
      } 
      catch(error)
      {
        this.handleLoginRegisterError(error);
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
    var objectintg=this.allintegration.find((x => x.id==val))

    this.integration.push(objectintg)
    this.idofintg.push(objectintg.id)
    this.integration=this.integration.filter((value,index)=>this.integration.indexOf(value)===index)
  }
  removeallintgfromarray(val)
  {
    this.integration=this.integration.filter(({ id }) => id !== val);
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
    this.message.setErrorMessage(response.error.error, 'toast-bottom-right');
}
private handlerrormessage(error: any) {
  this.message.setErrorMessage(error, 'toast-bottom-right');
}
}
