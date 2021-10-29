import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingpageComponent } from './useraccount/landingpage/landingpage.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SignupComponent } from './useraccount/signup/signup.component';
import { SiginComponent } from './useraccount/sigin/sigin.component';
import { FooterComponent } from './useraccount/footer/footer.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { HomebarComponent } from './pages/homebar/homebar.component';
import { WorkdeskModule } from './workdesk/workdesk.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatExpansionModule} from '@angular/material/expansion';
import { UserloginserviceService } from './service/userloginservice.service';
import { AuthService } from './service/authservice.service';
import { GigaaaApiService } from './service/gigaaaapi.service';
import { MessageService } from './service/messege.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { sharedres_service } from './service/sharedres.service';
import { gigaaasocketapi } from './service/gigaaasocketapi.service';
import { RouterModule } from '@angular/router';
import { LinkexpiredialogComponent } from './useraccount/linkexpiredialog/linkexpiredialog.component';
import { ChartsModule } from 'ng2-charts';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SiginComponent,
    LandingpageComponent,
    FooterComponent,
    SidebarComponent,
    HomebarComponent,
    LinkexpiredialogComponent,
    

  ],
  imports: [
    ChartsModule,
    ToastrModule.forRoot(),
    WorkdeskModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatListModule,
    MatSidenavModule,
    MatExpansionModule,
    
  ], 
  bootstrap: [AppComponent],
  providers: [gigaaasocketapi,UserloginserviceService,AuthService,GigaaaApiService,MessageService,sharedres_service,{
    provide: MatDialogRef,
    useValue: {}
  }],
  entryComponents: [LandingpageComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],

})
export class AppModule { }
