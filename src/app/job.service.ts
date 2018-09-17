import { Injectable } from '@angular/core';

import { Job } from './job';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private jobUrl = 'https://sbda-api.herokuapp.com/api/job';

  getJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.jobUrl);
  }
  
  getJob(jobReferenceNo: string): Observable<Job> {
    const url = `${this.jobUrl}/${jobReferenceNo}`;
    return this.http.get<Job>(url);
  }

  addJob(job: Job): Observable<Job> {
    return this.http.post<Job>(this.jobUrl, job, httpOptions);
  }

  updateJob(job: Job): Observable<any> {
    return this.http.put<Job>(this.jobUrl, job, httpOptions);
  }

  deleteJob(job: Job): Observable<Job> {
    const url = `${this.jobUrl}/${job.jobReferenceNo}`;
    return this.http.delete<Job>(url, httpOptions);
  }

  constructor(
    private http: HttpClient
  ) { }
}
