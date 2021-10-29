import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { MessageService } from 'src/app/service/messege.service';
import { sharedres_service } from 'src/app/service/sharedres.service';
import { InviteagentComponent } from 'src/app/workdesk/agents/inviteagent/inviteagent.component';
import { LinkexpiredialogComponent } from '../linkexpiredialog/linkexpiredialog.component';
import { SiginComponent } from '../sigin/sigin.component';
import { SignupComponent } from '../signup/signup.component';
declare var $: any;

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {
  registerationarea:boolean=false;
  inviteduserdata:any;
  constructor(private gigaaaapi:GigaaaApiService,
    private sharedres:sharedres_service,
    public dialog: MatDialog,public dialogRef: MatDialogRef<SignupComponent>) { }

  ngOnInit(): void {
 
    this.sharedres.getinivationdetail();
    this.getdetailsforinviteduser()

  }
 

  openDialogSignUp() {
    // this.sharedres.getinivationdetail();

    const dialogRef = this.dialog.open(SignupComponent,{
      hasBackdrop:false,
      panelClass:"signup-dialog-container",
      data:this.inviteduserdata,
    });
    
  }
  openDialogLogin() {
    // this.sharedres.getinivationdetail();

    const dialogRef = this.dialog.open(SiginComponent,{
      hasBackdrop:false,
      panelClass:"signin-dialog-container",
      data:this.inviteduserdata,
    });
    this.dialogRef.close()
  
  }
  getdetailsforinviteduser()
  {
      this.sharedres.inviteduserdetails$.subscribe(data=>{
        this.inviteduserdata=data;
if(data!=null)
{
  if(data['expired']==false)
  {
    this.registerationarea=false;

  }
  else {
    this.registerationarea=true;

  }

}
else
{
  this.opendialogforinvitationexpire();
  this.registerationarea=true;

}
       
      })
  }

  // show dialog for initation expired
  opendialogforinvitationexpire() {
this.dialog.open(LinkexpiredialogComponent,{
      hasBackdrop:false,
      panelClass:"linkexpired-form-container",
    });
    
  }
  getsociallinks(linkval:any)
  {
    window.open(linkval,"_blank")
  }
  // 
  tabslinksforfooter(linkval:any)
  {
    window.open(linkval)

  }
}
