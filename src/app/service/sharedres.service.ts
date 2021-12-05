import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { access } from 'node:fs';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
import { GigaaaApiService } from './gigaaaapi.service';
import { MessageService } from './messege.service';

@Injectable({
  providedIn: 'root'
})
export class sharedres_service {
  inviteduserdata:any;
  inviteduserdetails$: Observable<any>;
  private inviteduserdetailssubject = new Subject<any>();

  refreshagentlist$: Observable<any>;
  private refreshagentlistsubject = new Subject<any>();

    submitapplication$: Observable<any>;
    private submitappsubject = new Subject<any>();

    agentrole$: Observable<any>;
    private agentrolesubject = new Subject<any>();

    agentsetting$: Observable<any>;
    private agentsettingsubject = new Subject<any>();

    agentsprofilesetting$: Observable<any>;
    private agentsprofilesettingsubject = new Subject<any>();

    runsocketapiusingint_id$: Observable<any>;
    private runsocketapiusingint_idsubject = new Subject<any>();

    runthesocketforagent$: Observable<any>;
    private runthesocketforagent_subject = new Subject<any>();
    constructor(private gigaaaapi:GigaaaApiService,
      private router: ActivatedRoute,

      private message:MessageService) {
      //  this.getuserole();
        this.agentsetting$ = this.agentsettingsubject.asObservable().pipe();
        this.submitapplication$ = this.submitappsubject.asObservable().pipe()
        this.agentrole$=this.agentrolesubject.asObservable().pipe();
        this.refreshagentlist$=this.refreshagentlistsubject.asObservable().pipe();
        this.agentsprofilesetting$=this.agentsprofilesettingsubject.asObservable().pipe();
        this.inviteduserdetails$=this.inviteduserdetailssubject.asObservable().pipe();
        this.runsocketapiusingint_id$=this.runsocketapiusingint_idsubject.asObservable().pipe();
        this.runthesocketforagent$=this.runthesocketforagent_subject.asObservable().pipe();


    }
    getintegrationrelation(intid:any) {
       console.log(intid)
    this.submitappsubject.next({int_id:intid});
 }
 getagentsettingview(val)

{ this.agentsettingsubject.next(val);

}

public getuserole()
{  const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
var accesstoken=getdata?.access_token;
var uuid=getdata?.subscription_id.subsid.uuid;
if(accesstoken!=null &&uuid !=null)
{
  try{


        const intid = JSON.parse(localStorage.getItem('intgid'))
        if(intid!=null)
        {
          this.gigaaaapi.getroleofagent(accesstoken,uuid,intid?.int_id).subscribe(data=>{
            this.agentrolesubject.next(data);

          }) }
  }

  catch(err)
  {
   this.message.setErrorMessage(err.error);
  }
}
}

// get refresh agent list

getrefreshagentlist(val)
{
  this.refreshagentlistsubject.next(val);
}
// get agent settings view with respect to invitation status
getagentprofilesetting(val)
{
 this.agentsprofilesettingsubject.next(val);
}

getinivationdetail()
{
  var code;
  this.router.queryParams.subscribe(data=>{
    code=  data['invitation_code']
    console.log(code)
    if(code!=null)
    {
    this.gigaaaapi.getinvitationdetails(code).subscribe(data=>{
      console.log(data)

          this.inviteduserdetailssubject.next(data);


    },err=>{
      this.message.setErrorMessage(err.error.error);
   this.inviteduserdetailssubject.next(null);

    })
  }
  })

}

// get run socket api
getcallsocketapi(val){
this.runsocketapiusingint_idsubject.next(val)
}


// runagentsocket
runagentsocket(val)
{
  this.runthesocketforagent_subject.next(val)
}


}
