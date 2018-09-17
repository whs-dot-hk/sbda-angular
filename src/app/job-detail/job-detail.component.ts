import { Component, OnInit } from '@angular/core';

import { Job } from '../job';

import { Router, ActivatedRoute } from '@angular/router';

import { JobService } from '../job.service';

import * as moment from 'moment';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  job: Job;

  editingJob: Job;

  isEditing: boolean = false;

  isLoading: boolean = true;

  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private jobService: JobService
  ) { }

  getJob(): void {
    const jobReferenceNo = this.route.snapshot.paramMap.get('jobReferenceNo');
    this.jobService.getJob(jobReferenceNo)
      .subscribe(job => {
        job.timeStamp = moment(job.timeStamp).format('DD/MM/YYYY');
        this.job = job;
        this.isLoading = false;
      });
  }

  save(): void {
    this.jobService.updateJob({ jobReferenceNo: this.editingJob.jobReferenceNo, jobTitle: this.editingJob.jobTitle } as Job)
      .subscribe(_ => {
        this.errorMessage = 'Job saved.'
        this.job = Object.assign({}, this.editingJob);
        this.isEditing = false;
      });
  }

  delete(): void {
    this.errorMessage = '';
    
    this.jobService.deleteJob({ jobReferenceNo: this.job.jobReferenceNo } as Job)
      .subscribe();
    this.router.navigate(['/job']);
  }

  edit(): void {
    this.errorMessage = '';

    this.editingJob = Object.assign({}, this.job);
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.editingJob = null;
    this.isEditing = false;
  }

  ngOnInit() {
    this.getJob();
  }

}
