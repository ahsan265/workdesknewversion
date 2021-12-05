import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { oAuthService } from 'src/app/service/authservice.service';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { MessageService } from 'src/app/service/messege.service';
import { UserloginserviceService } from 'src/app/service/userloginservice.service';
import { SiginComponent } from '../sigin/sigin.component';
declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  submitted: false;

  showModal: boolean = false;

  password: boolean;
  confirmPassword: boolean;
 passtag:any
 srcpass1:any
 passType: string = 'password';
  passType1: string = 'password';
 passtag1:any
 srcpass2:any
  constructor(private authService: oAuthService,
    private gigaaaApiService: GigaaaApiService,
    private formBuilder:FormBuilder,
    private route:Router,
    private gigaaapi:GigaaaApiService,
    private router: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data,
    private messageService: MessageService,private useraccountservice:UserloginserviceService,public dialog: MatDialog,public dialogRef: MatDialogRef<SignupComponent>) { }
    

   private handleLoginRegisterError(response: any) {
    for (const key in response.error.errors) {
      if (response.error.errors.hasOwnProperty(key)) {
        this.messageService.setErrorMessage(
          response.error.errors[key][0],
          "toast-bottom-right"
        );
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

  getdatafrominvitation()
  {
    if(this.data!=null)
    {
      this.form.patchValue({
        email:this.data?.email
      })
    }
 
  }
  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  private async login(email, password): Promise<void> {
    try {
     // await this.authService.login(email, password);
  
    } catch (error) {
      this.handleLoginRegisterError(error);
    }
  }
   public async registerUser(): Promise<void> {
    const data = {
      profile: {
        first_name: this.form.value.first_name,
        last_name: this.form.value.last_name
      }
    }

      try {
    
        await this.gigaaaApiService.registerUser(this.form.value);
        await this.login(this.form.value.email, this.form.value.password);
        const profileData = JSON.parse(localStorage.getItem('gigaaa-user'))
        profileData['profile'] = { first_name: this.form.value.first_name, last_name: this.form.value.last_name };
        localStorage.setItem('gigaaa-user', JSON.stringify(profileData))
       const user= await this.gigaaaApiService.updateUserProfile(this.authService.getLoggedUser(), data)
        await this.authService.updateUser(this.authService.getLoggedUser())
        this.useraccountservice.getopendashboard(1);
        this.dialogRef.close()
      } catch (error) {
        this.handleLoginRegisterError(error);
      }

  }
  ngOnInit(): void {
    this.srcpass1="../../../assets/assets_workdesk/private_1_1.svg"
    this.srcpass2="../../../assets/assets_workdesk/private_1_1.svg"
    this.form = this.formBuilder.group(
      {
        first_name: ["", Validators.required],
        last_name: ["", Validators.required],
        privatePolicy: ["", Validators.required],
        email: [
          "",
          [
            Validators.required,
            Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/),
          ],
        ],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: [""],
      },
      { validators: this.checkPasswords }
    );
    $(document).ready(function() {
      $(document).foundation();
    });
    this.getdatafrominvitation();

  }
  openDialogLogin() {
   this.dialog.open(SiginComponent,{
      width: '450px',
      hasBackdrop:true,
      panelClass:"signin-dialog-container"
    
    });
   this.dialogRef.close()

  }
}
