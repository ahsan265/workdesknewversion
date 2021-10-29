import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { MessageService } from 'src/app/service/messege.service';

@Component({
  selector: 'app-addagent',
  templateUrl: './addagent.component.html',
  styleUrls: ['./addagent.component.css']
})
export class AddagentComponent implements OnInit {
  languagetag:any;
  languageflag:any;
  langid:any;
  intgg:any;
  all_agent:any;
  alllanguage=[];
  idoflang=[];
  idofintg=[];
  allintegration=[];

 
  languages = [
    { name: 'ARABIC', id: 6, image:"/assets/language/flag-of-Egypt.png" },
    { name: 'ENGLISH', id: 56, image: "/assets/language/flag-of-United-Kingdom.png" },
    { name: 'GERMAN', id: 83, image: "/assets/language/flag-of-Germany.png" },
    { name: 'RUSSIAN', id: 131, image:"/assets/language/flag-of-Russia.png" },
    { name: 'TURKISH', id: 175,image: "/assets/language/flag-of-Turkey.png" }
  ];
  integration:any;
  constructor(public dialog: MatDialog,private gigaaaapi:GigaaaApiService,private messageservie:MessageService) { }
  form:FormGroup;
  // form = new FormGroup({
  //   email: new FormControl('', [
  //     Validators.required,
  //     Validators.email
  //   ]),
  //   language_ids: new FormControl('', [
  //     Validators.required,Validators.minLength(6)
  //   ]),
 
  //   role: new FormControl('', [
  //     Validators.required,
  //   ]),
  //   integration_ids: new FormControl('', [
  //     Validators.required,
  //   ]),
  //  });
  ngOnInit(): void {
    this.getallintegrationlist();
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      language_ids: new FormControl('', [
        Validators.required
      ]),
   
      role: new FormControl('', [
        Validators.required,
      ]),
      integration_ids: new FormControl('', [
        Validators.required,
      ]),
     });
    this.languagetag='ENGLISH';
    this.languageflag='/assets/language/flag-of-United-Kingdom.png';
  }
  public async assignrole(): Promise<void>
  {          this.idoflang=this.idoflang.filter((value,index)=>this.idoflang.indexOf(value)===index)
    this.idofintg=this.idofintg.filter((value,index)=>this.idofintg.indexOf(value)===index)
    const data = {
      assignrole: {
        email: this.form.value.email,
        role: this.form.value.role,
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
     this.dialog.closeAll();
      // this.getallagents();
    }
    catch(error) {
      
      this.handleLoginRegisterError(error);
    }

   
  }

  getallintegrationlist()
  {
   try {
     const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
     var accesstoken=getdata.access_token;
     var subsid=getdata.subscription_id.subsid.uuid
     this.gigaaaapi.getallintegration(accesstoken,"").subscribe(data=>{
     this.integration=data;
     this.intgg=this.integration[0].name;
     })
   } catch (error) {
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
}
