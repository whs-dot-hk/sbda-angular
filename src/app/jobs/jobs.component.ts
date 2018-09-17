import { Component, OnInit } from '@angular/core';
import { Job } from '../job';

import { JobService } from '../job.service';

import * as moment from 'moment';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {
  jobs: Job[];
  
  getJobs(): void {
    this.jobService.getJobs()
      .subscribe(jobs => {
        jobs.map(job => {
          job.timeStamp = moment(job.timeStamp).format('DD/MM/YYYY');
          return job;
        });
        
        this.jobs = jobs
      });
  }

  constructor(
    private jobService: JobService
  ) { }

  ngOnInit() {
    this.getJobs();
  }

}
