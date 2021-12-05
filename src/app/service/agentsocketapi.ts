import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { MessageService } from "./messege.service";
import { sharedres_service } from "./sharedres.service";

@Injectable({
    providedIn: 'root'
  })
  export class agentsocketapi {
    getagetnlist$: Observable<any>;
    private getagentlistsubject = new Subject<any>();
     ws:  WebSocket;
     issocketliveornot:boolean=false;
    constructor(private message:MessageService,private sharedres:sharedres_service)
     {    this.getagetnlist$ = this.getagentlistsubject.asObservable().pipe();
        this.getagentlive()
     this.callsocketapi_by_selecting_intgid()
      }
        public  callsocketapi_by_selecting_intgid()
          {    const socketvalue = JSON.parse(localStorage.getItem('gigaaa-socket'))
          
            this.sharedres.runsocketapiusingint_id$.subscribe(data=>{
              if(data==1 && socketvalue!=true)
              {   
                this.getagentlive()
              }
        })
      
      }
      getagentlive()
      {
        var getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
        var accesstoken=getdata?.access_token;
          var uuid=getdata?.subscription_id.subsid.uuid;
          var intid = JSON.parse(localStorage.getItem('intgid'))
          const loggedinuser_uuid = JSON.parse(localStorage.getItem('userlogged_uuid'));

          var integrationid=intid?.int_id;
          if(accesstoken!=null&&uuid!=null&&integrationid!=null)
            { 
                var  url="wss://websockets.gigaaa.com/customer-support/agents?organization="+uuid+"&integration="+integrationid+"&agent="+loggedinuser_uuid?.uuid;
                this.ws = new WebSocket(url);
                    this.ws.onopen=(e)=>{
                        this.message.setErrorMessage("hello-"+e.type);
                  
                      var checksocketopen=true;
                        localStorage.setItem('gigaaa-socket', JSON.stringify(checksocketopen));
                        
                        this.issocketliveornot=true;

                    }
                    this.ws.onmessage = (e) => {
                   if(this.ws.OPEN==1)
                   {
                       if(e.data !="ping")
                       {
                         var data=JSON.parse(e.data)
                       
                          data.forEach(element => {
                            if(element?.email==this.getsettingforloggedinagent())
                            {
                              if(element?.is_available==true&&element?.is_online==true)
                              {
                                localStorage.setItem('user-status', JSON.stringify(true));
                              }
                              else{
                                localStorage.setItem('user-status', JSON.stringify(false));
                              }
                            }
                            });
                          
                        
                         this.sharedres.runagentsocket(1);

                            this.getagentlistsubject.next(data)
                          }
                    }
                    }
                    this.ws.onerror=(e)=>{
                        this.message.setErrorMessage("Agent-socket-"+e.type);
                    }
                    this.ws.onclose=(e)=>{
                        this.message.setErrorMessage("Agent-socket-"+e.type);
                    }

      }
    }

    // send online away status
    send_isonline_status(data:boolean)
    {  if(this.ws.readyState==this.ws.OPEN)
      {
        var object= {"action": "update_status", "data":{"action": "is_available", "value":data}}
     
        this.ws.send(JSON.stringify(object))    
      }
      }

          // send agents params
    send_agentsparam_status(invited:any,active:any,inactive:any,languages:Array<any>)
    { 
      if(this.ws.readyState==this.ws.OPEN)
      {var object= {"action": "filter", "data":{"languages": languages, "invited":invited, "active":active, "inactive":inactive}}
      console.log(object)
     
        this.ws.send(JSON.stringify(object))    
    }
      }

      // close agent socket
      closeagentsocket()
      {if(this.ws.OPEN==1)
        {
        this.ws.close();
        }
      }
      // get loggedin Email

      getsettingforloggedinagent()
      {
         const getdata = JSON.parse(localStorage.getItem('gigaaa-user'))
        return getdata.email;  
      }
}