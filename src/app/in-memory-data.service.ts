import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const jobs = [
      { id: 'JHK00001', jobReferenceNo: 'JHK00001', jobTitle: 'Programmer', jobFunctions: ['JF1'] },
      { id: 'JHK00002', jobReferenceNo: 'JHK00002', jobTitle: 'Analyst Programmer', jobFunctions: ['JF1', 'JF2'] }
    ];

    return {jobs};
  }
}