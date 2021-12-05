import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { MessageService } from 'src/app/service/messege.service';

@Component({
  selector: 'app-updatepassword',
  templateUrl: './updatepassword.component.html',
  styleUrls: ['./updatepassword.component.css']
})
export class UpdatepasswordComponent implements OnInit {
  passType: string = 'password';
  passType1: string = 'password';
  passType2: string = 'password';
  passtag:string='Show';
  passtag1:string='Show';
  passtag2:string='Show';
  srcpass1:any;
  srcpass2:any;
  srcpass3:any;
  public form : FormGroup;

  constructor(public dialogRef: MatDialogRef<UpdatepasswordComponent>, private message:MessageService, private fb:FormBuilder, private gigaaaapi:GigaaaApiService) { }
 
  ngOnInit(): void {
    this.srcpass1="../../../assets/assets_workdesk/hide_icon.svg"
    this.srcpass2="../../../assets/assets_workdesk/hide_icon.svg"
    this.srcpass3="../../../assets/assets_workdesk/hide_icon.svg"

    this.form = this.fb.group({
    
      oldpassword: new FormControl('', [
        Validators.required,Validators.minLength(6)]),
        newpassword: new FormControl('', [
          Validators.required,Validators.minLength(6)]),
          confirmpassword: new FormControl('', [
            Validators.required,Validators.minLength(6)]),
     });
  }
  changePasswordType(id){
    if(id=="current")
    {
      if(this.passType=== 'password'){
        this.passType= 'text';
        this.passtag="hide";
        this.srcpass1="../../../assets/assets_workdesk/hide_icon.svg"
        }else {
        this.passType= 'password';
        this.passtag="Show"
        this.srcpass1="../../../assets/assets_workdesk/show_icon.svg"

        }
    }
    else if(id==="new")
    {
      if(this.passType1==='password'){
        this.passType1='text';
        this.passtag1="hide"
        this.srcpass2="../../../assets/assets_workdesk/hide_icon.svg"

        }else {
        this.passType1= 'password';
        this.passtag1="Show";
        this.srcpass2="../../../assets/assets_workdesk/show_icon.svg"

        }
    }
    else if(id==="new_current")
    {
      if(this.passType2== 'password'){
        this.passType2= 'text';
        this.passtag2="hide"
        this.srcpass3="../../../assets/assets_workdesk/hide_icon.svg"
        }else{
        this.passType2= 'password';
        this.passtag2="Show";
        this.srcpass3="../../../assets/assets_workdesk/show_icon.svg"
        }
    }
  }
  changePasswordType1(id){
  
     if(id=="current")
    {
      if(this.passType1== 'password'){
        this.passType1= 'text';
        this.passtag1="hide"
        }else if(this.passType== 'text'){
        this.passType1= 'password';
        this.passtag1="Show"
    
        }
    }

  }
  changePasswordType2(id){
 if(id=="new_current")
    {
      if(this.passType2== 'password'){
        this.passType2= 'text';
        this.passtag2="hide"
        }else if(this.passType== 'text'){
        this.passType2= 'password';
        this.passtag2="Show"
    
        }
    }
  }
 public async updatepasssword(): Promise<void>
  {
    try{
      if (this.form.get('oldpassword').invalid) {
        this.message.setErrorMessage("Current Password field is required")
      }
      else  if (this.form.get('newpassword').invalid) {
        this.message.setErrorMessage("New Password field  is required")
      }
      else  if (this.form.get('confirmpassword').invalid) {
        this.message.setErrorMessage("Comfirm New Password")
      } 
      else{
        const subsiddata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
        var data={"old": this.form.value.oldpassword, "new1": this.form.value.newpassword, "new2": this.form.value.confirmpassword}
       await this.gigaaaapi.updatePassword(subsiddata.access_token,data)
        this.message.setSuccessMessage("Password Updated Successfully")
        this.dialogRef.close();
      }
    }
    catch(error){
      console.log(error)
      this.message.setErrorMessage(error.error.error)
    }
    
  }
}


