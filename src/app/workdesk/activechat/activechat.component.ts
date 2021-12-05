import { Component, OnInit } from '@angular/core';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { MessageService } from 'src/app/service/messege.service';
import { sharedres_service } from 'src/app/service/sharedres.service';

@Component({
  selector: 'app-activechat',
  templateUrl: './activechat.component.html',
  styleUrls: ['./activechat.component.css']
})
export class ActivechatComponent implements OnInit {
  queueagent:any;
  languages = [
    { name: 'ARABIC', id: 6, image:"/assets/language/flag-of-Egypt.png" },
    { name: 'ENGLISH', id: 56, image: "/assets/language/flag-of-United-Kingdom.png" },
    { name: 'GERMAN', id: 83, image: "/assets/language/flag-of-Germany.png" },
    { name: 'RUSSIAN', id: 131, image:"/assets/language/flag-of-Russia.png" },
    { name: 'TURKISH', id: 175,image: "/assets/language/flag-of-Turkey.png" }
  ];
  integration=[{intg:"gigaaa.com AI Voicebot",id:89}]
  constructor(private shares:sharedres_service,private gigaaaapi:GigaaaApiService,private message:MessageService) { }

  ngOnInit(): void {
   this.getloadedagentlist();
  }
  counter(u: number) {
    return new Array(u);
  }

  getlistofagentinqeue(subsid,intid)
  {
     const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
     var accesstoken=getdata.access_token;

      try{
    this.gigaaaapi.getalllistofqueueagent(accesstoken,subsid,intid).subscribe(data=>{
      this.queueagent=data['queue'];
      console.log(data)
    
    })
      }
      catch(error)
      {
        this.handleLoginRegisterError(error);
      }
  }

  getactiveagentusingintegration()
  {
    this.shares.submitapplication$.subscribe(data=>{
    this.getlistofagentinqeue(data.Subs_id,data.int_id);
    })
  }

  private handleLoginRegisterError(response: any) {
    this.message.setErrorMessage(response.error.error, 'toast-bottom-right');
}

getloadedagentlist()
{
  var id=JSON.parse(localStorage.getItem('intgid'));
  this.getlistofagentinqeue(id.subs_id,id.int_id)
}
}
