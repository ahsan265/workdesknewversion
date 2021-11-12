import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Console } from 'console';
import { ChartsModule, Label, MultiDataSet } from 'ng2-charts';
import { defineLocale, enGbLocale } from 'ngx-bootstrap/chronos';
import { BsDaterangepickerDirective, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { element } from 'protractor';
import { Subscription } from 'rxjs';
import { GigaaaApiService } from 'src/app/service/gigaaaapi.service';
import { MessageService } from 'src/app/service/messege.service';
import { sharedres_service } from 'src/app/service/sharedres.service';
declare var $: any;
interface IRange {
  value: Date[];
  label: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selecteddashboard:any;
  showcallsdashboard:boolean=false;
  showchatsdashboard:boolean=false;
  showvisitordashboard:boolean=false;
  listofdashboard=[{name:"Calls",status:true},{name:"Chats",status:false},{name:"Visitors",status:false},{name:"Tickets",status:false}];
   myChart:any;
   myChart1:any;
   myChart2:any;
   myChart3:any;
   subscription: Subscription;

   rangeSelected:any;
  // get last week days 
    beforeOneWeek = new Date(new Date().getTime() - 60 * 60 * 24 * 7 * 1000)
   day = this.beforeOneWeek.getDay()
   diffToMonday = this.beforeOneWeek.getDate() - this.day + (this.day === 0 ? -6 : 1)
   lastMonday = new Date(this.beforeOneWeek.setDate(this.diffToMonday))
   lastSunday = new Date(this.beforeOneWeek.setDate(this.diffToMonday + 6));

   // get last current month days

  
   ranges: IRange[] = [
    {
      value: [new Date(new Date().setDate(new Date().getDate())),new Date()],
      label: 'Today'
    }
    ,{
      value: [new Date(new Date().setDate(new Date().getDate() - 1)),new Date(new Date().setDate(new Date().getDate() - 1))],
      label: 'Yesterday'
    },{
    value: [new Date(new Date().setDate(new Date().getDate()-new Date().getDay()+1)),new Date(new Date().setDate(new Date().getDate()-new Date().getDay()+7))],
    label: 'This week'
  }, {
    value: [this.lastMonday,this.lastSunday],
    label: 'Last week'
  }, {
    value: [new Date(new Date().getFullYear(), new Date().getMonth(), 1),  new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)],
    label: 'This Month'
  },
  {
    value: [new Date(new Date().getFullYear(), new Date().getMonth()-1, 1),  new Date(new Date().getFullYear(), new Date().getMonth(), 0)],
    label: 'Last Month'
  },
  {
    value: [new Date(new Date().getFullYear(), 0, 1), new Date(new Date().getFullYear(), 11, 31)],
    label: 'This year'
  },
  {
    value: [new Date(new Date().getFullYear()-1, 0, 1), new Date(new Date().getFullYear()-1, 11, 31)],
    label: 'Last year'
  }];
  bsValue=this.ranges[0].value
  @ViewChild(BsDaterangepickerDirective, { static: false }) dateRangePicker: BsDaterangepickerDirective;
 date=new Date(new Date().setDate(new Date().getDate()))
  bsConfig={
    containerClass:"theme-white",
    displayOneMonthRange:false,
    showWeekNumbers:false ,
    adaptivePosition: true,
    dateInputFormat: 'YYYY-MM-DD',
    ranges: this.ranges,
    todayHighlight: true,
    preventChangeToNextMonth: false,  
    startView:2,
    customTodayClass:'custom-today-class',
    showPreviousMonth: false,
    returnFocusToInput: true 
  };
  public barChartOptions: ChartOptions = {
    responsive: true,
    showLines:false,
    maintainAspectRatio: false,

    layout:{
      padding:{
        bottom:24
      }
    },
    legend:{
      position:'top',
      align:'center'
    },
 
     tooltips: {
      enabled: true,
      mode: 'nearest',
      displayColors: false,
      
      callbacks: {
          title: function () {
              return null;
          },

      }
   },
   hover: {
      mode: 'index',
      intersect: false
   },
    scales: {
     
      xAxes: [{
          gridLines: {
              display:false
          },
        
      },
      
    ],
      yAxes: [{
          gridLines: {
              display:false
          },
          ticks: {
            display: false,
            beginAtZero: true

        },
      }],
      
  }
  };
 
  public barChartLabels: Label[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = false;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor : [
        "#64DFDF", "#715DFF", "#64DFDF", "#715DFF", "#64DFDF","#715DFF","#64DFDF"
      ],
      radius:[24],
      hoverRadius:24,
      hitRadius:24,
      borderCapStyle:'round',
      maxBarThickness:96,
      fill: false,
      hoverBackgroundColor: [
        "#64DFDF", "#715DFF", "#64DFDF", "#715DFF", "#64DFDF","#715DFF","#64DFDF"
      ]
    },
   
  ];
  newVar:any;
  answered:any;
  answeredbyai:any;
  totalmissed:any;
  totalincoming:any;

  answeredper:any;
  answeredbyaiper:any;
  totalmissedper:any;
  totalincomingper:any;
   ansper:any;
   ansbyai:any;
   totalmissper:any;
   totalincper:any;

  constructor(private sharedres:sharedres_service,
    private router:Router,
    private localeService: BsLocaleService,
     private gigaaaservice:GigaaaApiService,private messageservie:MessageService) { 
      enGbLocale.weekdaysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      enGbLocale.week.dow = 1;
      defineLocale('en-gb', enGbLocale);
      this.localeService.use('en-gb');
      this.localeService.currentLocale;
      
     }
     getlistofdashboard(val)
     {
       if(val=="Calls")
       {
         this.showcallsdashboard=false;
         this.showchatsdashboard=true;
         this.showvisitordashboard=true;
       }
       else if(val=="Chats"){
        this.showcallsdashboard=true;
        this.showchatsdashboard=false;
        this.showvisitordashboard=true;

       }
       else if(val=="Visitors")
       {
        this.showcallsdashboard=true;
        this.showchatsdashboard=true;
        this.showvisitordashboard=false;
       }
      this.selecteddashboard=val;
     }
     ngOnInit(): void {
       this.getlistofdashboard("Calls");
      this.onDateChange([this.ranges[0].value[0],this.ranges[0].value[1]])
      this.router.navigate(['dashboard'])
     // this.generatecircleround();
      this.roundbarchartcorners()
      this.loadcallstatsoninit();
      this.loadcallchartinit();
      this.getstatsonintg();
    $(document).ready(function() {
      $(document).foundation();
    });
    this.createdevicechart();
    this.createoschart();
    this.createbrowerschart();
  }

  incomingbarchart(data,lebel)
  {  
    if (typeof(this.myChart) != "undefined") {
      this.myChart.destroy();
      }
    var ctx = document.getElementById("income") as HTMLCanvasElement;
   this.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels:['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          data:data,
         backgroundColor : [
            "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB","#1C54DB","#1C54DB"
          ],
          hoverBackgroundColor: [
            "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB","#1C54DB","#1C54DB"
          ],
          radius:[24],
          hoverRadius:24,
          hitRadius:24,
          borderCapStyle:'round',
          maxBarThickness:65,
          fill: false,
        }],

      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        showLines:false,
        layout:{
          padding:{
            bottom:22
          }
        },
        legend:{
          position:'top',
          align:'center',
          display:false
        },
     
         tooltips: {
          enabled: true,
          mode: 'nearest',
          displayColors: false,
          
          callbacks: {
              title: function () {
                  return null;
              },
    
          }
      },
      hover: {
        mode: 'index',
        intersect: false
     },
      scales: {
       
        xAxes: [{
            gridLines: {
                display:false
            },
          
        },
        
      ],
        yAxes: [{
            gridLines: {
                display:true,
                drawBorder: false,

            },
            ticks: {
              display: true,
              beginAtZero: true,
              maxTicksLimit: 4,
              padding: 14

  
          },
        }],
        
    }
    }
    });
   this.myChart.update()
  }
  missedbarchart(data,lebel)
  {
    if (typeof(this.myChart1) != "undefined") {
      this.myChart1.destroy();
      }
    var ctx = document.getElementById("missed") as HTMLCanvasElement;
     this.myChart1 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          data:data,
         backgroundColor : [
            "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB","#1C54DB","#1C54DB"
          ],
          hoverBackgroundColor: [
            "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB","#1C54DB","#1C54DB"
          ],
          radius:[24],
          hoverRadius:24,
          hitRadius:24,
          borderCapStyle:'round',
          maxBarThickness:65,
          fill: false,
        }],

      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        showLines:false,
        layout:{
          padding:{
            bottom:24
          }
        },
        legend:{
          position:'top',
          align:'center',
          display:false
        },
     
         tooltips: {
          enabled: true,
          mode: 'nearest',
          displayColors: false,
          
          callbacks: {
              title: function () {
                  return null;
              },
    
          }
      },
      hover: {
        mode: 'index',
        intersect: false
     },
      scales: {
       
        xAxes: [{
            gridLines: {
                display:false
            },
          
        },
        
      ],
        yAxes: [{
            gridLines: {
                display:true,
                drawBorder: false,

            },
            ticks: {
              display: true,
              beginAtZero: true,
              maxTicksLimit: 4,
              padding: 14

  
          },
        }],
        
    }
    }
    });
    this.myChart1.update()

  }
  answeredbarchart(data,lebel)
  {
    if (typeof(this.myChart2) != "undefined") {
      this.myChart2.destroy();
      }
    var ctx = document.getElementById("answered") as HTMLCanvasElement;
 this.myChart2 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels:['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          data:data,
         backgroundColor : [
            "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB","#1C54DB","#1C54DB"
          ],
          hoverBackgroundColor: [
            "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB","#1C54DB","#1C54DB"
          ],
          radius:[24],
          hoverRadius:24,
          hitRadius:24,
          borderCapStyle:'round',
          maxBarThickness:65,
          fill: false,
        }],

      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        showLines:false,
        layout:{
          padding:{
            bottom:24
          }
        },
        legend:{
          position:'top',
          align:'center',
          display:false
        },
     
         tooltips: {
          enabled: true,
          mode: 'nearest',
          displayColors: false,
          
          callbacks: {
              title: function () {
                  return null;
              },
    
          }
      },
      hover: {
        mode: 'index',
        intersect: false
     },
      scales: {
       
        xAxes: [{
            gridLines: {
                display:false
            },
          
        },
        
      ],
        yAxes: [{
            gridLines: {
                display:true,
                drawBorder: false,

            },
            ticks: {
              display: true,
              beginAtZero: true,
              maxTicksLimit: 4,
              padding: 14

  
          },
        }],
        
    }
    }
    });
    this.myChart2.update();
  }
  ansbyaibarchart(data,lebel)
  {
    if (typeof(this.myChart3) != "undefined") {
      this.myChart3.destroy();
      }
    var ctx = document.getElementById("ansbyai") as HTMLCanvasElement;
    this.myChart3 = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [{
          data:data,
         backgroundColor : [
            "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB","#1C54DB","#1C54DB"
          ],
          hoverBackgroundColor: [
            "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB", "#1C54DB","#1C54DB","#1C54DB"
          ],
          radius:[24],
          hoverRadius:24,
          hitRadius:24,
          borderCapStyle:'round',
          maxBarThickness:65,
          fill: false,
        }],

      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        showLines:true,
        layout:{
          padding:{
            bottom:24
          }
        },
        legend:{
          position:'top',
          align:'center',
          display:false
        },
     
         tooltips: {
          enabled: true,
          mode: 'nearest',
          displayColors: false,
          
          callbacks: {
              title: function () {
                  return null;
              },
    
          }
      },
      hover: {
        mode: 'index',
        intersect: false
     },
      scales: {
       
        xAxes: [{
            gridLines: {
                display:false,
                drawBorder: false,

            },
          
        },
        
      ],
        yAxes: [{
            gridLines: {
                display:true,
                drawBorder: false,

            },
            ticks: {
              display: true,
              beginAtZero: true,
              maxTicksLimit: 4,
              padding: 14
  
          },
        }],
        
    }
    }
    });
      this.myChart3.update()
  }
  // devices chart 
  createdevicechart()
  {
    var ctx = document.getElementById("devicechart") as HTMLCanvasElement;
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Desktop', 'Tablet','Mobile'],
        datasets: [{
          data:[250, 500,250],
          backgroundColor: ['#1C54DB','#715DFF','#6B94F9'],
          borderWidth    : 0

        }],

      },
      options: {
         cutoutPercentage: 48,
        responsive: false,
        tooltips: {
        displayColors: false,
  
        callbacks: {
          title : () => null // or function () { return null; }
       }
     },

        legend:{
          display:false,  
          position:'top'
           
        },
      
        legendCallback: function(chart) {
          var text = [];
          text.push('<ul  style="list-style:none">');
          var ds = chart.data.datasets[0];
          for (var i=0; i<ds.data.length; i++) {
            text.push('<li style="color:#A6A8BA; display:block; width:50%; margin-bottom:20px;">');
            text.push('<span style="background-color:' + ds.backgroundColor[i] + ';color: rgba(22, 39, 65, 0.8); margin-right:12px;height:14px; width:14px;border-radius:50%">' + '</span>' +'<span style="font-size:12px;line-height:14px;vertical-align: text-top;color: rgba(22, 39, 65, 0.8);">' +chart.data.labels[i]+'</span>'+'<span style="display:block;margin-left:25px; color: #162741; font-weight: 500;">'+ds.data[i] + '%'+'</span>');
            text.push('</li>');
          }
          text.push('</ul>');
          return text.join("") ;
        }
      }
    });
    // generate HTML legend
   $("#devicechartlegend").html(myChart.generateLegend());
  }
   // browser chart 
   createbrowerschart()
   {
     var ctx = document.getElementById("browserchart") as HTMLCanvasElement;
     var myChart = new Chart(ctx, {
       type: 'doughnut',
       data: {
         labels: ['Google Chrome', 'Mozzila Firefox','Opera','Safari','Other'],
         datasets: [{
           data: [250,150,250,150,200],
           backgroundColor: ['#1C54DB', '#715DFF','#6B94F9','#FF155A','#1E03BF'],
           borderWidth    : 0

         }]
       },
       options: {
          cutoutPercentage: 48,
         responsive: false,
         tooltips: {
         displayColors: false,
   
         callbacks: {
           title : () => null // or function () { return null; }
        }
      },
 
         legend:{
           display:false,  
            
         },
       
         legendCallback: function(chart) {
           var text = [];
           text.push('<ul  style="list-style:none">');
           var ds = chart.data.datasets[0];
           for (var i=0; i<ds.data.length; i++) {
             text.push('<li style="color:#A6A8BA; display:inline-block; width:50%; margin-bottom:20px;">');
             text.push('<span style="background-color:' + ds.backgroundColor[i] + ';color: rgba(22, 39, 65, 0.8); margin-right:12px;height:14px; width:14px;border-radius:50%">' + '</span>' +'<span style="font-size:12px;line-height:14px;vertical-align: text-top;color: rgba(22, 39, 65, 0.8);">' +chart.data.labels[i]+'</span>'+'<span style="display:block;margin-left:25px; color: #162741; font-weight: 500;">'+ds.data[i] + '%'+'</span>');
             text.push('</li>');
           }
           text.push('</ul>');
           return text.join("") ;
         }
       }
     });
     // generate HTML legend
    $("#browserlegend").html(myChart.generateLegend());
   }
// browser chart 
createoschart()
{
  var ctx = document.getElementById("oschart") as HTMLCanvasElement;
  var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Microsoft Windows', 'IOS','Linux','Android'],
      datasets: [{
        data:  [250,500,250,250],
        backgroundColor: ['#1C54DB', '#715DFF','#6B94F9','#FF155A'],
        borderWidth    : 0

      }]
    },
    options: {
       cutoutPercentage: 48,
      responsive: false,
      tooltips: {
      displayColors: false,

      callbacks: {
        title : () => null // or function () { return null; }
     }
   },

      legend:{
        display:false,  
         
      },
    
      legendCallback: function(chart) {
        var text = [];
        text.push('<ul  style="list-style:none">');
        var ds = chart.data.datasets[0];
        for (var i=0; i<ds.data.length; i++) {
          if(i==1 || i==0)
          {
            text.push('<li style="color:#A6A8BA; display:inline-block; width:50%; margin-bottom:20px;">');
            text.push('<span style="background-color:' + ds.backgroundColor[i] + ';color: rgba(22, 39, 65, 0.8); margin-right:12px;height:14px; width:14px;border-radius:50%">' + '</span>' +'<span style="font-size:12px;line-height:14px;vertical-align: text-top;color: rgba(22, 39, 65, 0.8);">' +chart.data.labels[i]+'</span>'+'<span style="display:block;margin-left:25px; color: #162741; font-weight: 500;">'+ds.data[i] + '%'+'</span>');
            text.push('</li>');
          }
          else{
            text.push('<li style="color:#A6A8BA; display:block; width:50%; margin-bottom:20px;">');
            text.push('<span style="background-color:' + ds.backgroundColor[i] + ';color: rgba(22, 39, 65, 0.8); margin-right:12px;height:14px; width:14px;border-radius:50%">' + '</span>' +'<span style="font-size:12px;line-height:14px;vertical-align: text-top;color: rgba(22, 39, 65, 0.8);">' +chart.data.labels[i]+'</span>'+'<span style="display:block;margin-left:25px; color: #162741; font-weight: 500;">'+ds.data[i] + '%'+'</span>');
            text.push('</li>');
          }
          
        }
        text.push('</ul>');
        return text.join("") ;
      }
    }
  });
  // generate HTML legend
 $("#oslegend").html(myChart.generateLegend());
}

   getstatsonintg()
  { 
    try{ 
    this.subscription=  this.sharedres.submitapplication$.subscribe(data=>{
      this.getcallstats(data?.int_id)
      this.getcallcharts(data?.int_id)
    
    })
  // this.subscription.unsubscribe();
    }
    catch(error)
    {
      this.messageservie.setErrorMessage(error);
    }
    
  }
  // call stats
  getcallstats(intid)
  { 
    try 
    {
      const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
      var accesstoken=getdata?.access_token;
      var orgid=getdata?.subscription_id?.subsid?.uuid
        this.gigaaaservice.getcallstatistics(accesstoken,orgid,intid).subscribe(data=>{
          this.answeredbyai=data['handed_to_ai']?.count;
          this.totalmissed=data['missed']?.count;
          this.answered=data['answered']?.count;
          this.totalincoming=data['incoming']?.count;

          this.answeredper =this.getpercentagecalculated(data['answered']?.increase);
          this.answeredbyaiper=this.getpercentagecalculated(data['handed_to_ai']?.increase);
          this.totalmissedper=this.getpercentagecalculated(data['missed']?.increase);
          this.totalincomingper=this.getpercentagecalculated(data['incoming']?.increase);

          this.ansper=this.answeredper;
          this.ansbyai=this.answeredbyaiper;
          this.totalmissper=this.totalmissedper;
          this.totalincper=this.totalincomingper;

          this.answeredper='\xa0'+'+'+'\xa0'+this.answeredper;
          this.answeredbyaiper='\xa0'+'+'+'\xa0'+this.answeredbyaiper;
          this.totalmissedper='\xa0'+'+'+'\xa0'+this.totalmissedper;
          this.totalincomingper='\xa0'+'+'+'\xa0'+this.totalincomingper;
       

        })
    }
    catch (err){
      
      this.messageservie.setErrorMessage(err.error.error);
    }
 
  }
  
  //  call charts
  getcallcharts(intid)
  { 
    try 
    {
      const getdata = JSON.parse(localStorage.getItem('gigaaa-subscription'))
      var accesstoken=getdata?.access_token;
      var orgid=getdata?.subscription_id?.subsid?.uuid
        this.gigaaaservice.getcallchart(accesstoken,orgid,intid).subscribe(data=>{
          console.log(data);
      var dataforincoming=this.getbarchartdata(data['incoming']);
      var dataforincoming1=this.getbarchartdata(data['missed']);
      var dataforincoming2=this.getbarchartdata(data['handed_to_ai']);
      var dataforincoming3=this.getbarchartdata(data['answered']);

      var labelforincoming=this.getbarchartlabels(data['incoming']);
      var labelforincoming1=this.getbarchartlabels(data['missed']);
      var labelforincoming2=this.getbarchartlabels(data['handed_to_ai']);
      var labelforincoming3=this.getbarchartlabels(data['incoming']);
      
      this.incomingbarchart(dataforincoming,labelforincoming);
      this.missedbarchart(dataforincoming1,labelforincoming1);
      this.ansbyaibarchart(dataforincoming2,labelforincoming2);
      this.answeredbarchart(dataforincoming3,labelforincoming3);
 
        })
    }
    catch (err){
      console.log(err)
      this.messageservie.setErrorMessage(err.error);
    }
 
  }
  // get bar chart data
  getbarchartdata(val:Array<any>)
  { 
    var data=[]
    val.forEach(element => {
      if(element.count==null)
      {
        data.push(0)
      }
      else
      {
        data.push(element.count)

      }
    });
    return data;
  }
  getbarchartlabels(val:Array<any>)
  {
    var label=[]
    val.forEach(element=> {
    var date =new Date(element.date).toDateString();
    var update= date.substring(0, date.length-4)
        label.push(update)
   
    });
    return label;
  }
  getpercentagecalculated(val)
  {var calculated;
    if(val!=null)
    {
      calculated=(val*100).toFixed(2);
      if(calculated>0)
      {
        return calculated;

      }
      else{
        return calculated;

      }
    }
    else{
      return 0
    }
  }

  loadcallstatsoninit()
  {
    setTimeout(() => {
      const intg_id = JSON.parse(localStorage.getItem('intgid'))
      if(intg_id?.int_id!=null)
      {
      this.getcallstats(intg_id?.int_id)
  
      }
    },500)
    
  }
  loadcallchartinit()
  {
    setTimeout(() => {
      const intg_id = JSON.parse(localStorage.getItem('intgid'))
      if(intg_id?.int_id!=null)
      {
        this.getcallcharts(intg_id?.int_id)
  
      }
    }, 500);
    
  }
  generatecircleround()
  {Chart.defaults.doughnut    = Chart.helpers.clone(Chart.defaults.doughnut);

    Chart.controllers.doughnut = Chart.controllers.doughnut.extend({
      draw: function(ease) {
          var ctx           = this.chart.ctx;
          var easingDecimal = ease || 1;
          var arcs          = this.getMeta().data;
          Chart.helpers.each(arcs, function(arc, i) {
              arc.transition(easingDecimal).draw();
  
              var pArc   = arcs[i === 0 ? arcs.length - 1 : i - 1];
              var pColor = pArc._view.backgroundColor;
  
              var vm         = arc._view;
              var radius     = (vm.outerRadius + vm.innerRadius) / 2;
              var thickness  = (vm.outerRadius - vm.innerRadius) / 2;
              var startAngle = Math.PI - vm.startAngle - Math.PI / 2;
              var angle      = Math.PI - vm.endAngle - Math.PI / 2;
  
              ctx.save();
              ctx.translate(vm.x, vm.y);
  
              ctx.fillStyle = i === 0 ? vm.backgroundColor : pColor;
              ctx.beginPath();
              ctx.arc(radius * Math.sin(startAngle), radius * Math.cos(startAngle), thickness, 0, 2 * Math.PI);
              ctx.fill();
  
              ctx.fillStyle = vm.backgroundColor;
              ctx.beginPath();
              ctx.arc(radius * Math.sin(angle), radius * Math.cos(angle), thickness, 0, 2 * Math.PI);
              ctx.fill();
  
              ctx.restore();
          });
      }
  });
  }
  roundbarchartcorners()
  {
   Chart['elements'] .Rectangle.prototype.draw = function() {
     var ctx = this._chart.ctx;
     var vm = this._view;
     var left, right, top, bottom, signX, signY, borderSkipped, radius;
     var borderWidth = vm.borderWidth;
     var cornerRadius = 4;
 
     if (!vm.horizontal) {
         // bar
         left = vm.x - vm.width / 2;
         right = vm.x + vm.width / 2;
         top = vm.y;
         bottom = vm.base;
         signX = 1;
         signY = bottom > top? 1: -1;
         borderSkipped = vm.borderSkipped || 'bottom';
     } else {
         // horizontal bar
         left = vm.base;
         right = vm.x;
         top = vm.y - vm.height / 2;
         bottom = vm.y + vm.height / 2;
         signX = right > left? 1: -1;
         signY = 1;
         borderSkipped = vm.borderSkipped || 'left';
     }
 
     // Canvas doesn't allow us to stroke inside the width so we can
     // adjust the sizes to fit if we're setting a stroke on the line
     if (borderWidth) {
         // borderWidth shold be less than bar width and bar height.
         var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
         borderWidth = borderWidth > barSize? barSize: borderWidth;
         var halfStroke = borderWidth / 2;
         // Adjust borderWidth when bar top position is near vm.base(zero).
         var borderLeft = left + (borderSkipped !== 'left'? halfStroke * signX: 0);
         var borderRight = right + (borderSkipped !== 'right'? -halfStroke * signX: 0);
         var borderTop = top + (borderSkipped !== 'top'? halfStroke * signY: 0);
         var borderBottom = bottom + (borderSkipped !== 'bottom'? -halfStroke * signY: 0);
         // not become a vertical line?
         if (borderLeft !== borderRight) {
             top = borderTop;
             bottom = 0;
         }
         // not become a horizontal line?
         if (borderTop !== borderBottom) {
             left = borderLeft;
             right = borderRight;
         }
     }
 
     ctx.beginPath();
     ctx.fillStyle = vm.backgroundColor;
     ctx.strokeStyle = vm.borderColor;
     ctx.lineWidth = borderWidth;
 
     // Corner points, from bottom-left to bottom-right clockwise
     // | 1 2 |
     // | 0 3 |
     var corners = [
         [left, bottom],
         [left, top],
         [right, top],
         [right, bottom]
     ];
 
     // Find first (starting) corner with fallback to 'bottom'
     var borders = ['bottom', 'left', 'top', 'right'];
     var startCorner = borders.indexOf(borderSkipped, 0);
     if (startCorner === -1) {
         startCorner = 0;
     }
 
     function cornerAt(index) {
         return corners[(startCorner + index) % 4];
     }
 
     // Draw rectangle from 'startCorner'
     var corner = cornerAt(0);
     ctx.moveTo(corner[0], corner[1]);
 
     for (var i = 1; i < 4; i++) {
         corner = cornerAt(i);
       var  nextCornerId = i+1;
         if(nextCornerId == 4){
             nextCornerId = 0
         }
 
         var nextCorner = cornerAt(nextCornerId);
 
         var width = corners[2][0] - corners[1][0];
         var height = corners[0][1] - corners[1][1];
         var x = corners[1][0];
         var y = corners[1][1];
         
          radius = cornerRadius;
         
         // Fix radius being too large
         if(radius > height/2){
             radius = height/2;
         }if(radius > width/2){
             radius = width/2;
         }
 
         ctx.moveTo(x + radius, y);
         ctx.lineTo(x + width - radius, y);
         ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
         ctx.lineTo(x + width, y + height - radius);
         ctx.quadraticCurveTo(x + width, y + height, x + width - 0, y + height);
         ctx.lineTo(x + radius, y + height);
         ctx.quadraticCurveTo(x, y + height, x, y + height - 0);
         ctx.lineTo(x, y + radius);
         ctx.quadraticCurveTo(x, y, x + radius, y);
 
     }
 
     ctx.fill();
     if (borderWidth) {
         ctx.stroke();
     }
 }; 
  }

  //selectionpanel for selecting the panes
      onDateChange(event: Array<Date>)
      { 
            console.log(event)
            var ismatched=false;
            var d = new Date(event[0]);
            var d1 = new Date(event[1]);
          this.ranges.filter(x=>{
          if(x.value[0].toDateString()==d.toDateString()&&x.value[1].toDateString()==d1.toDateString())
            {
              this.rangeSelected=x.label
              ismatched=true;
             
                $('.btn').addClass('.selected');
            
            }
          })
          if(ismatched==false)
          {
            var  month = '' + (d.getMonth() + 1);
            var   day = '' +(d.getDate());
            var  year = d.getFullYear();
      
          if (month.length < 2) 
           {
            month = '0' + month;
      
           }
          if (day.length < 2) 
            {
              day = '0' + day;
      
            }
            var dateStart= [day,month,year].join('/');
      
            var  month1 = '' + (d1.getMonth() + 1);
            var   day1 = '' +( d1.getDate());
            var  year1 = d1.getFullYear();
      
          if (month1.length < 2) 
           {
            month1 = '0' + month1;
      
           }
          if (day1.length < 2) 
            {
              day1 = '0' + day1;
      
            }
            var dateEnd= [day1,month1,year1].join('/');
      
            this.rangeSelected= dateStart+ " -"+ dateEnd;
                
          }

      }
}
