import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { oAuthService } from 'src/app/service/authservice.service';
import { MessageService } from 'src/app/service/messege.service';
import { UserloginserviceService } from 'src/app/service/userloginservice.service';
import { SignupComponent } from '../signup/signup.component';
declare var $: any;

@Component({
  selector: 'app-sigin',
  templateUrl: './sigin.component.html',
  styleUrls: ['./sigin.component.css']
})
export class SiginComponent implements OnInit {
  passtag:any
  srcpass1:any
  passType: string = 'password';
   passType1: string = 'password';
  passtag1:any
  srcpass2:any
  hide = true;

  form = new FormGroup({
  
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,Validators.minLength(6)])
    
   });
  constructor( private authService: oAuthService,
   
    private messageService: MessageService,
    private useraccountservice:UserloginserviceService,
    @Inject(MAT_DIALOG_DATA) public data,
    private route:Router,public dialog: MatDialog,public dialogRef: MatDialogRef<SiginComponent>) { }
    public async login(): Promise<void> {
      try {
     //   await this.authService.login(this.form.value.email, this.form.value.password);
        this.dialogRef.close();
      } catch (error) {
        this.handleLoginRegisterError(error);
      }
    }
    private handleLoginRegisterError(response: any) {
      for (const key in response.error.errors) {
        if (response.error.errors.hasOwnProperty(key)) {
          this.messageService.setErrorMessage(response.error.errors[key][0], 'toast-bottom-right');
        }
      }
    }
    changePasswordType(id){
      if(id=="password")
      {
        if(this.passType=== 'password'){
          this.passType= 'text';
          this.srcpass1="../../../assets/assets_workdesk/eye_1.svg"
          }else {
          this.passType= 'password';
          this.srcpass1="../../../assets/assets_workdesk/private_1_1.svg"
  
          }
      }
      else if(id=="confirmPassword")
      {
        if(this.passType1==='password'){
          this.passType1='text';
          this.srcpass2="../../../assets/assets_workdesk/eye_1.svg"
  
          }else {
          this.passType1= 'password';
          this.srcpass2="../../../assets/assets_workdesk/private_1_1.svg"
  
          }
      }
    }
    getinvitationdetails()
    {
      if(this.data!=null)
      {
        this.form.patchValue({
          email:this.data?.email
        })
      }
   
    }
  ngOnInit(): void {
    this.getinvitationdetails();
    this.srcpass1="../../../assets/assets_workdesk/private_1_1.svg"
    this.srcpass2="../../../assets/assets_workdesk/private_1_1.svg"
    $(document).ready(function() {
      $(document).foundation();
    });
  }
  myFunction() {
    this.hide = !this.hide;
  }
  movetohome()
  { 
     this.useraccountservice.getopendashboard(1)
      this.route.navigate(['agent']);
      this.dialogRef.close()
}
openDialogSignup() {
  const dialogRef = this.dialog.open(SignupComponent,{
    width: '450px',
    hasBackdrop:true,
    panelClass:"signup-dialog-container"
  
  });

  this.dialogRef.close()
}
}
