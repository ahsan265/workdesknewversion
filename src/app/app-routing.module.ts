import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GigaaaApiService } from './service/gigaaaapi.service';
import { MessageService } from './service/messege.service';
import { UserloginserviceService } from './service/userloginservice.service';
import { CallbackComponent } from './callback/callback.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthService } from './service/auth.service';
import { LandingpageComponent } from './useraccount/landingpage/landingpage.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: "", component: LandingpageComponent },
  { path: "logout", component: LogoutComponent },
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./workdesk/workdesk.module').then(
            (module) => module.WorkdeskModule
          ),
      },
    ],
    canActivate: [AuthService],
  },
  { path: "callback", component: CallbackComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
  providers: [
    UserloginserviceService,
    AuthService,
    GigaaaApiService,
    MessageService,
  ],
})
export class AppRoutingModule {}
