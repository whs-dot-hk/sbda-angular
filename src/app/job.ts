import { JobFunction } from './jobFunction';

export class Job {
  id: string;
  jobReferenceNo: string;
  jobTitle: string;
  jobFunctions: JobFunction[];
  timeStamp: string;
}