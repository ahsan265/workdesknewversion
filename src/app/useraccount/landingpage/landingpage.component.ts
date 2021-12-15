import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
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
  styleUrls: ['./landingpage.component.css'],
})
export class LandingpageComponent implements OnInit {
  registerationarea: boolean = false;
  inviteduserdata: any;
  constructor(
    public authService: AuthService,
    private gigaaaapi: GigaaaApiService,
    private sharedres: sharedres_service,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<SignupComponent>
  ) {}

  ngOnInit(): void {
    this.sharedres.getinivationdetail();
  }

  getsociallinks(linkval: any) {
    window.open(linkval, '_blank');
  }
  //
  tabslinksforfooter(linkval: any) {
    window.open(linkval);
  }
}
