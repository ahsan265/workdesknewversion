import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { type } from 'node:os';
import { runInThisContext } from 'node:vm';
import { Observable, Observer } from 'rxjs';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { GigaaaApiService } from './gigaaaapi.service';
import { MessageService } from './messege.service';
import { sharedres_service } from './sharedres.service';

@Injectable({
  providedIn: 'root'
})
export class gigaaasocketapi {
  tokenque:any;
  tokenvisit:any;
  closestate:any;
  checksocketopen:boolean=false;  
   currentStateofcallsocket:any;
  
  getlistofagentsinque$: Observable<any>;
  private getlistofagentsinquesubjecct = new Subject<any>();
   ws:  WebSocket;
  getlistofvisitor$: Observable<any>;
  private getlistofvisitorsubject = new Subject<any>();

  constructor(private message:MessageService,private sharedres:sharedres_service) { 
    this.getlistofagentsinque$ = this.getlistofagentsinquesubjecct.asObservable().pipe();
    this.getlistofvisitor$=this.getlistofvisitorsubject.asObservable().pipe();
  
    this.getlistofliveque();
    this.callsocketapi_by_selecting_intgid();
  }

callsocketapi_by_selecting_intgid()
{    const socketvalue = JSON.parse(localStorage.getItem('gigaaa-socket'))

  this.sharedres.runsocketapiusingint_id$.subscribe(data=>{
    if(data==1 && socketvalue!=true)
    {   
        this.getlistofliveque();
     //   this.checksocketopen=false;
    }
    // else if(this.checksocketopen==false)
    // {
    //   this.getlistofliveque();
    //   this.checksocketopen=true;

    // }
  
    
  })

}


   getlistofliveque()
  {   
    var getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
    var accesstoken=getdata?.access_token;
      var uuid=getdata?.subscription_id.subsid.uuid;
      var intid = JSON.parse(localStorage.getItem('intgid'))
      var integrationid=intid?.int_id;
  //  console.log(accesstoken,uuid,integrationid)
   if(accesstoken!=null&&uuid!=null&&integrationid!=null)
     {   

      var  url="wss://websockets.gigaaa.com/customer-support/queue?organization="+uuid+"&integration="+integrationid+"&token="+accesstoken;
     this.ws = new WebSocket(url);
   
     this.ws.onopen=(e)=>{
        this.message.setErrorMessage("socket-"+e.type);
        this.checksocketopen=true;
        localStorage.setItem('gigaaa-socket', JSON.stringify(this.checksocketopen));

        // if(this.closestate!=null)
        //   {
        //     this.sendfilterparams(this.currentStateofcallsocket);
        //     this.closestate=null;
        //   }
          
      }
    
       this.ws.onmessage = (e) => {
        console.log(e.data);
        if(e.data !="ping")
        {
          var data=JSON.parse(e.data)
          console.log(data);
          this.getlistofagentsinquesubjecct.next(data);   
          const online = JSON.parse(localStorage.getItem('user-status'))
       
          if(data['new_call']==true&&online['is_online']==true)
            {
              this.getdesktopnotification("Customer Support","Please connect call")
            }
        }
        else {
         this.ws.send("pong")
        }
      
      };

      this.ws.onerror=(e)=>{
        this.message.setErrorMessage("socket-"+e.type);
      }
      this.ws.onclose=(e)=>{
        this.message.setErrorMessage("socket-"+e.type);
        this.closestate=e.code;
       setTimeout(()=>{
         this.getlistofliveque();
        }, 100);
      }
   
      }

  }



  getdesktopnotification(title:any,body:any)
  {
    Notification.requestPermission().then((permission)=>{
      if(permission="granted")
      {
        var notification = new Notification(title,{body:body,icon:'../../../assets/gigaaa_logo.png'});
        setTimeout(function(){
            notification.close();
        },3000);
      }
     
  });
  }
  // send params to get filter calls data 
   sendfilterparams(data:any)
  { console.log(data)
    this.currentStateofcallsocket=data;
    if(this.ws.readyState==this.ws.OPEN)
    {
      this.ws.send(JSON.stringify(data))    }
  }
 
  // send params to get filter calls data 
  send_daterange_params(data:any)
  { 
      console.log(data)
    if(this.ws.readyState==this.ws.OPEN)
    {
      this.ws.send(JSON.stringify(data))    
    }
    }
    closewebsocketcalls()
    { if(this.ws.OPEN==1)
      {
        this.ws.close();
      }
    }
 
}
