import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { JobsComponent } from './jobs/jobs.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobNewComponent } from './job-new/job-new.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'job/new', component: JobNewComponent },
  { path: 'job/:jobReferenceNo', component: JobDetailComponent },
  { path: 'job', component: JobsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
