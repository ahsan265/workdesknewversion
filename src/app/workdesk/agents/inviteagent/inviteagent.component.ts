import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
// import { type } from 'node:os';
import { element } from 'protractor';
import { interval } from 'rxjs';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { MessageService } from 'src/app/service/messege.service';
import { sharedres_service } from 'src/app/service/sharedres.service';

declare var $: any;

@Component({
  selector: 'app-inviteagent',
  templateUrl: './inviteagent.component.html',
  styleUrls: ['./inviteagent.component.css']
})
export class InviteagentComponent implements OnInit{
  showlang:boolean;
  addagentarray:any;
  arraycounter:any;
  lang=[];
  selected_lang_ids=[];
  number_of_lang:any;
  selectednumber:any
  selectalllangstat:boolean;
  selectedonebyone:boolean;
  language=[{name:'Arabic' ,status:false,id:6},
  {name:'English' ,status:false,id:56},
  {name:'German' ,status:false,id:83},
  {name:'Russian' ,status:false,id:131},
  {name:'Spanish' ,status:false,id:161},
  {name:'Turkish' ,status:false,id:175},
];
form: FormGroup;

  constructor(private sharedres:sharedres_service,
    private formBuilder:FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public dialogRef: MatDialogRef<InviteagentComponent>,
    private gigaaaApiService: GigaaaApiService,
    private messageService: MessageService) { }


  ngOnInit(): void {
    interval(1000).subscribe(() => {
      this.changeDetector.detectChanges();
    });
    this.getlllangugaes();
    this.form = this.formBuilder.group(
      {
        emailgroup:this.formBuilder.array([]),
      });
      this.addinvitelist()
    $(document).ready(function() {
      $(document).foundation()
    });
    this.showlang=true;
    this.arraycounter=1;
    this.addmoreagents(1);


  }

  // select languages one by one
  selectlanguage(id,status)
  {

    console.log(id,status);
    if(status==true)
    {
      this.selected_lang_ids.push(id);
      console.log(this.selected_lang_ids);
      this.number_of_lang=this.selected_lang_ids.length+"\xa0"+"Selected"
      this.number_of_lang=this.number_of_lang.slice()
     if(this.selected_lang_ids.length==6)
     {
      this.number_of_lang="Selected All";
      this.selectalllangstat=true
     }
    }
    else{
      var index = this.selected_lang_ids.indexOf(id);
      if (index !== -1) {
        this.selected_lang_ids.splice(index, 1);
      }
      this.number_of_lang=this.selected_lang_ids.length+"\xa0"+"Selected"
      if(this.selected_lang_ids.length==0)
      {
        this.number_of_lang="No Selected"
        this.selectalllangstat=false
      }

    }
     console.log(this.selected_lang_ids)

  }
  // get all langugaes
  getalllanguage(val,ind)
  {
  var udpatedlang=[];
    if(val==true)
 {
      this.lang.forEach(element => {
      udpatedlang.push({name:element.name,status:true,id:element.id})
      this.selected_lang_ids.push(element.id);
      //this.getlangselect(ind).push(new FormControl(element.id))


   });
   if(this.selected_lang_ids.length==6)
   {
     this.number_of_lang="Selected All"
     this.selectalllangstat=true;
   }
  }
 else{
  this.lang.forEach(element => {
     var index = this.selected_lang_ids.indexOf(element.id);
     this.getlangselect(ind).removeAt(index);

    if (index !== -1) {
      this.selected_lang_ids.splice(index, 1);
    }
    udpatedlang.push({name:element.name,status:false,id:element.id})

 });
 if(this.selected_lang_ids.length==0)
 {
   this.number_of_lang="No Selected"
   this.selectalllangstat=false;

 }
 }
 this.lang=udpatedlang;
  }


  // add row for adding agent
  addmoreagents(val)
  {

  //  this.addagentarray=Array(val)

  }

  addmoreagentrow()
  {
    this.arraycounter++;
    this.addmoreagents(this.arraycounter)

  }

  // remove row for removing agent
  removeagentrow(val)
  {

    const creds = this.form.controls.emailgroup as FormArray;
    creds.removeAt(val)

    //this.arraycounter--;
    //this.addmoreagents(this.arraycounter)
  }

  showlangdropdown()
  {
      $('#accordion').foundation('hideAll');

  }

//invite agent invitation
getinviteagentvalidation()
{
 if(this.form.get("emailgroup").invalid)
 {
   this.messageService.setErrorMessage("Please enter valid information.")
 }

  else
  {
    this.Inviteagent();
  }
}


get emailgrouparray()
{
  return this.form.get('emailgroup') as FormArray
}
addinvitelist() {
  const creds = this.form.get('emailgroup') as FormArray;
  creds.push(
    this.formBuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
        ],
      ],
      role:['agent', [Validators.required]],
      language_ids:this.formBuilder.array(this.selected_lang_ids)
    })
  );
console.log(creds.value)
}
///////////////////

  getlancontrol(): FormArray {
    return this.form.get("emailgroup") as FormArray
  }
 getlangselect(index:number) : FormArray
 {
  return this.getlancontrol().at(index).get("language_ids") as FormArray

 }

//  newlang(): FormGroup {
//   return this.formBuilder.group({
//     ids:['', [Validators.required]],
//   })
// }
// addlang(index:number) {
//   this.getlangselect(index).push(this.newlang());
//  //
// }

removeandaddlang(e,empIndex:number,langindex:number,id) {
  if(e.target.checked===true)
  {
    this.getlangselect(empIndex).push(new FormControl(id))
    this.selectednumber=this.getlangselect(empIndex).length+"\xa0"+"Selected"

  }
  else if(e.target.checked===false){
    console.log(langindex);
    var index=this.getlangselect(empIndex).value.findIndex(idd => idd === id)
  this.getlangselect(empIndex).removeAt(index);

 }



}

checkAll(e,empIndex:number) {
  if(e==true)
  {

     // first remove all the languages
     this.lang.forEach((element )=> {
      let index = this.lang.indexOf(element.id);
      this.getlangselect(empIndex).removeAt(index);

    });
    // add all the languages
    this.lang.forEach(x=>{
      this.getlangselect(empIndex).push(new FormControl(x.id))
      this.selectedonebyone=true;
     // this.getselectedonebyone();
    })

  }
  else
  {
    this.lang.forEach((element )=> {
      let index = this.lang.indexOf(element.id);
      this.getlangselect(empIndex).removeAt(index);
      this.selectedonebyone=false;
   //   this.getselectedonebyone();
    });
    this.lang.forEach(o => o.status = false);

  }



}

isRowSelected(i: any,j:any): boolean {

    const existingFormControl = this.getlangselect(i).controls.find(c => c.value === j);
  return existingFormControl !== undefined

}

checkhowmanyselected(val)
{
    if(val==0)
    {
      return "Not selected"
    }
    else if(val<6)
    {
      return val+"\xa0"+"Selected"

    }

    else{
      return "All Selected"

    }
}
 setallcheckedbutton(val)
 {
  if(val==6)
  {
    return true;
  }
  else  if(val<6)
  {
    return false;
  }
 }

 getselectedonebyone(val)
 {

    if(val==6)
    {
      return true
    }
    else  if(val<=6){
      return
    }


 }



// invite agent endpoint

 Inviteagent(){
 var index;
    this.form.get('emailgroup').value.forEach( (element) => {
      var data=({"email":element.email,"role":element.role,"language_ids":element.language_ids})
      console.log(data)
        this.calladdgent(data);


      });
      // this.sharedres.getrefreshagentlist(1);


  }

  public async  calladdgent(data): Promise<void>
  {   const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
  var accesstoken=getdata?.access_token;
  var subsid=getdata?.subscription_id.subsid.uuid;
  const intid = JSON.parse(localStorage.getItem('intgid'))
    try{
      await   this.gigaaaApiService.getinviteagent(accesstoken,subsid,intid?.int_id,data);
      this.sharedres.getrefreshagentlist(1);
      this.messageService.setSuccessMessage("Agent Invitation has been sent.")


    }
    catch(err){
     this.messageService.setErrorMessage(err.error.error)
    }


      this.dialogRef.close();

  }
  public async getlllangugaes(): Promise<void>{
    const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
    var accesstoken=getdata.access_token;
    var subsid=getdata.subscription_id.subsid.uuid;
    const intid = JSON.parse(localStorage.getItem('intgid'))
    try{
      this.lang= await this.gigaaaApiService.getAllLanguages(accesstoken,subsid,intid.int_id)
      let updatearr = this.lang.map((item, i) => Object.assign({}, item, this.language[i]));
        console.log(updatearr)
        this.lang=updatearr;
      this.getalllanguage(false,0);

    }
    catch(err){
      this.messageService.setErrorMessage(err.error.error)
    }
  }

}
