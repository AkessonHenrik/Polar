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
// other imports 
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    GuestComponent,
    PollComponent,
    QuestionComponent,
    GraphComponent
  ],
  imports: [
    ChartsModule,
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: AuthComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'poll', component: PollComponent },
      { path: 'graph', component: GraphComponent }
    ]),
    HttpModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
