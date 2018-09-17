import { Component, OnInit } from '@angular/core';

import { Job } from '../job';
import { JobFunction } from '../jobFunction';

import { JobService } from '../job.service';

@Component({
  selector: 'app-job-new',
  templateUrl: './job-new.component.html',
  styleUrls: ['./job-new.component.css']
})
export class JobNewComponent implements OnInit {
  newNoOfVancancies: number = 1;
  newNoOfYearsOfExperiences: number = 0;
  newJobFunctions: JobFunction[] = [];

  addNewJobFunction(name: string): void {
    this.newJobFunctions.push({ name } as JobFunction);
  }

  errorMessage: string = '';

  addNewJob(newJobTitle: string, newCompanyDetailsName: string, newCompanyDetailsImageUrl: string, newJobRequirements: string): void {
    this.errorMessage = '';
    if (newJobTitle === '') {
      this.errorMessage = 'Error: jobTitle is required.'
      return;
    }
    this.jobService.addJob({
      noOfVancancies: this.newNoOfVancancies,
      jobTitle: newJobTitle,
      companyDetailsName: newCompanyDetailsName,
      companyDetailsImageUrl: newCompanyDetailsImageUrl,
      jobRequirements: newJobRequirements,
      noOfYearsOfExperiences: this.newNoOfYearsOfExperiences,
      jobFunctions: this.newJobFunctions
    } as Job)
      .subscribe(
        job => {
          this.errorMessage = `Job ${job.jobReferenceNo} added.`;
        },
        _ => {
          this.errorMessage = 'Error: Failed.';
        }
      );

    this.newNoOfVancancies = 1;
    this.newNoOfYearsOfExperiences = 0;

    this.newJobFunctions = [];
  }

  constructor(
    private jobService: JobService
  ) { }

  ngOnInit() {
  }
}
