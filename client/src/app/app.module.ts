import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MaterialModule } from '@angular/material';
import { ApiService } from './api.service';
import 'rxjs/add/operator/toPromise';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { RouterModule } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuestComponent } from './guest/guest.component';
import { PollComponent } from './poll/poll.component';
import { QuestionComponent } from './question/question.component';
import { GraphComponent } from './graph/graph.component';
import 'hammerjs';
import { UserComponent } from './user/user.component';
import { CreatePollComponent } from './create-poll/create-poll.component';
import { LayoutComponent } from './layout/layout.component';
import { SidenavComponent } from './sidenav/sidenav.component';
// other imports 
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    GuestComponent,
    PollComponent,
    QuestionComponent,
    GraphComponent,
    UserComponent,
    CreatePollComponent,
    LayoutComponent,
    SidenavComponent
  ],
  imports: [
    ChartsModule,
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AuthComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'poll/:shortcode', component: PollComponent },
      { path: 'graph/:shortcode', component: GraphComponent },
      { path: 'createPoll', component: CreatePollComponent },
      { path: 'guest', component: GuestComponent }
    ]),
    HttpModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
