import { Component, OnInit } from '@angular/core';

import { Job } from '../job';
import { JobFunction } from '../jobFunction';

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
        job.jobFunctions = job.jobFunctions.sort((a , b) => {
          if (a.name < b.name) return -1;
          
          if (a.name > b.name) return 1;
    
          return 0;
        });
        this.job = job;
        this.isLoading = false;
      });
  }

  save(): void {
    if (this.editingJob.jobTitle === '') {
      this.errorMessage = 'Error: jobTitle is required.';
      return;
    }

    const jobFunctions = this.editingJob.jobFunctions.map(jf => ({ name: jf.name }));

    this.jobService.updateJob({
      noOfVancancies: this.editingJob.noOfVancancies,
      jobReferenceNo: this.editingJob.jobReferenceNo,
      jobTitle: this.editingJob.jobTitle,
      companyDetailsName: this.editingJob.companyDetailsName,
      companyDetailsImageUrl: this.editingJob.companyDetailsImageUrl,
      jobRequirements: this.editingJob.jobRequirements,
      noOfYearsOfExperiences: this.editingJob.noOfYearsOfExperiences,
      jobFunctions
    } as Job)
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

  addNewJobFunction(name: string): void {
    if (name === '') return;
    var found = this.editingJob.jobFunctions.find(x => x.name === name);
    if (!found) this.editingJob.jobFunctions.push({ name } as JobFunction);
    this.editingJob.jobFunctions = this.editingJob.jobFunctions.sort((a , b) => {
      if (a.name < b.name) return -1;
      
      if (a.name > b.name) return 1;

      return 0;
    });
  }

  removeJobFunction(inputJf: JobFunction): void {
    this.editingJob.jobFunctions = this.editingJob.jobFunctions.filter(jf => jf.name !== inputJf.name);
  }

  ngOnInit() {
    this.getJob();
  }

}
