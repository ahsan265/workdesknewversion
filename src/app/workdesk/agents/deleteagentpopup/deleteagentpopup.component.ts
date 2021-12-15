import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { gigaaasocketapi } from 'src/app/service/gigaaasocketapi.service';
import { MessageService } from 'src/app/service/messege.service';
import { sharedres_service } from 'src/app/service/sharedres.service';

@Component({
  selector: 'app-deleteagentpopup',
  templateUrl: './deleteagentpopup.component.html',
  styleUrls: ['./deleteagentpopup.component.css']
})
export class DeleteagentpopupComponent implements OnInit {
 agentfullname:any;
 agentdisplayname:any;
 agentpic:any;
  constructor(private gigaaaapi:GigaaaApiService,
    private message:MessageService,
    private sharedres:sharedres_service,
    public dialogRef: MatDialogRef<DeleteagentpopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data) 
    { }

  ngOnInit(): void {
    console.log(this.data);
    this.agentfullname=this.data?.agentfullname;
    this.agentdisplayname=this.data?.display_name;
    this.agentpic=this.data?.image;
  }


  public async setdeleteagent(): Promise<void>
  {  const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
      var accesstoken=getdata.access_token;
      var subsid=getdata.subscription_id.subsid.uuid;
      const intg_id = JSON.parse(localStorage.getItem('intgid'))
     
    try{
    await  this.gigaaaapi.deleteagent(accesstoken,subsid,intg_id?.int_id,this.data?.agentuuid);
      this.sharedres.getrefreshagentlist(1);
      this.sharedres.getagentsettingview("teams");
      this.message.setSuccessMessage("Agent deleted successfully");
      this.dialogRef.close();
    }
    catch(err)
    {
      console.log(err)
      this.message.setErrorMessage(err.error.error);
    }
  }
}
