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
    if (name === '') return;
    var found = this.newJobFunctions.find(x => x.name === name);
    if (!found) {
      this.newJobFunctions.push({ name } as JobFunction);
      this.newJobFunctions = this.newJobFunctions.sort((a , b) => {
        if (a.name < b.name) return -1;
        
        if (a.name > b.name) return 1;

        return 0;
      });
    }
  }

  errorMessage: string = '';

  newCompanyDetailsName: string = '';
  newCompanyDetailsImageUrl: string = '';
  newJobRequirements: string = '';

  addNewJob(newJobTitle: string): void {
    this.errorMessage = '';
    if (newJobTitle === '') {
      this.errorMessage = 'Error: jobTitle is required.'
      return;
    }
    this.jobService.addJob({
      noOfVancancies: this.newNoOfVancancies,
      jobTitle: newJobTitle,
      companyDetailsName: this.newCompanyDetailsName,
      companyDetailsImageUrl: this.newCompanyDetailsImageUrl,
      jobRequirements: this.newJobRequirements,
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

    this.newCompanyDetailsName = '';
    this.newCompanyDetailsImageUrl = '';
    this.newJobRequirements = '';
  }

  removeNewJobFunction(newJobFunction: JobFunction): void {
    this.newJobFunctions = this.newJobFunctions.filter(jf => jf.name !== newJobFunction.name);
  }

  constructor(
    private jobService: JobService
  ) { }

  ngOnInit() {
  }
}
