import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkdeskRoutingModule } from './workdesk-routing.module';
import { AgentComponent } from './agents/agent.component';
import { UserloginserviceService } from '../service/userloginservice.service';
import { ChatComponent } from './call/chat.component';
import { ViewchatComponent } from './visitors/viewchat.component';
import { ActivechatComponent } from './activechat/activechat.component';
import { EditformComponent } from './editform/editform.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddagentComponent } from './addagent/addagent.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InviteagentComponent } from './agents/inviteagent/inviteagent.component';
import { AgentsettingsComponent } from './agents/agentsettings/agentsettings.component';
import { DeleteagentpopupComponent } from './agents/deleteagentpopup/deleteagentpopup.component';
import { CountUpModule } from 'ngx-countup';
import { UpdatepasswordComponent } from './agents/updatepassword/updatepassword.component';
import { ChartsModule } from 'ng2-charts';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CroppictureComponent } from './agents/croppicture/croppicture.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserModule } from '@angular/platform-browser';
import { getloadpictures } from './Datapipes/datapipes';
import { percentcolorpipe } from './Datapipes/percentcolor';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  declarations: [percentcolorpipe,getloadpictures, AgentComponent, ChatComponent, ViewchatComponent, ActivechatComponent, EditformComponent, AddagentComponent, DashboardComponent, InviteagentComponent, AgentsettingsComponent, DeleteagentpopupComponent, UpdatepasswordComponent, CroppictureComponent],
  imports: [  Ng2SearchPipeModule,  BrowserModule,  ImageCropperModule,
    BsDatepickerModule.forRoot(),
    ChartsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkdeskRoutingModule,
    MatDialogModule,
    CountUpModule,
    MatProgressBarModule,
    MatSliderModule
  ],
  providers: [UserloginserviceService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],

})
export class WorkdeskModule { }
