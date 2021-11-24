import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobilefilterspopup',
  templateUrl: './mobilefilterspopup.component.html',
  styleUrls: ['./mobilefilterspopup.component.css']
})
export class MobilefilterspopupComponent implements OnInit {
  showmainfilters:boolean=false;
  showselectedrange:boolean=false;
  constructor() { }

  ngOnInit(): void {
    this.showselectedpanel("main");
  }
showselectedpanel(val)
{
  if(val=="main")
  {
    this.showmainfilters=false;
    this.showselectedrange=true;
  }
  else if(val=="selectedrange"){
    this.showmainfilters=true;
    this.showselectedrange=false;
  }
}
}
