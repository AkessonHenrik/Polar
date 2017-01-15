import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { MaterialModule } from '@angular/material';
import { ApiService } from './api.service';
import 'rxjs/add/operator/toPromise';
import {RouterModule} from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuestComponent } from './guest/guest.component';
// other imports 
@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    GuestComponent
  ],
  imports: [
    MaterialModule.forRoot(),
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {path: '', component: AuthComponent},
      {path: 'dashboard', component: DashboardComponent}
    ]),
    HttpModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
