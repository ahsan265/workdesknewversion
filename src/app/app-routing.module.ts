import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingpageComponent } from './useraccount/landingpage/landingpage.component';
import { HomebarComponent } from './pages/homebar/homebar.component';
import { AppComponent } from './app.component';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from './service/authservice.service';
import { GigaaaApiService } from './service/gigaaaapi.service';
import { MessageService } from './service/messege.service';
import { UserloginserviceService } from './service/userloginservice.service';
import { agentsocketapi } from './service/agentsocketapi';
import { CallbackComponent } from './callback/callback.component';
import { LogoutComponent } from './logout/logout.component';

const routes: Routes = [  { path: 'dashboard', component: AppComponent},

{ path: 'workdesk', component: HomebarComponent},
{ path: '', redirectTo: "dashboard",pathMatch: 'full'},
{
  path: "callback", component: CallbackComponent
},
{
  path: "logout", component: LogoutComponent
},
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [UserloginserviceService,AuthService,GigaaaApiService,MessageService]
})
export class AppRoutingModule { }
