import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivechatComponent } from './activechat/activechat.component';
import { AgentComponent } from './agents/agent.component';
import { ChatComponent } from './call/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewchatComponent } from './visitors/viewchat.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'agents', component: AgentComponent},
  { path: 'calls', component: ChatComponent },
  { path: 'visitor', component: ViewchatComponent},
  { path: 'activechat', component: ActivechatComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkdeskRoutingModule {}
