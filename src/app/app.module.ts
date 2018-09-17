import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { JobsComponent } from './jobs/jobs.component';

import { FormsModule } from '@angular/forms';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { JobNewComponent } from './job-new/job-new.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IndexComponent } from './index/index.component';

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    JobDetailComponent,
    JobNewComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot(
    //  InMemoryDataService, { dataEncapsulation: false }
    //)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
