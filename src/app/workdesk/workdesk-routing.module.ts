import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GigaaaApiService } from '../service/gigaaaapi.service';
import { gigaaasocketapi } from '../service/gigaaasocketapi.service';
import { ActivechatComponent } from './activechat/activechat.component';
import { AgentComponent } from './agents/agent.component';
import { AgentsettingsComponent } from './agents/agentsettings/agentsettings.component';
import { ChatComponent } from './call/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewchatComponent } from './visitors/viewchat.component';

const routes: Routes = [{ path: '', component: DashboardComponent,pathMatch:"full" ,
},
  { path: 'agents', component: AgentComponent  },
{ path: 'calls', component: ChatComponent },
{ path: 'visitor', component: ViewchatComponent},
{ path: 'activechat', component: ActivechatComponent},
{ path: 'dashboard', component: DashboardComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class WorkdeskRoutingModule { }
