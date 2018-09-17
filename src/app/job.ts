import { JobFunction } from './jobFunction';

export class Job {
  id: string;
  noOfVancancies: number;
  jobReferenceNo: string;
  jobTitle: string;
  companyDetailsName: string;
  companyDetailsImageUrl: string;
  jobRequirements: string;
  noOfYearsOfExperiences: number;
  jobFunctions: JobFunction[];
  timeStamp: string;
}