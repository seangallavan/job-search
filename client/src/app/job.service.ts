import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { Job } from './shared/sdk/models/Job';
import { Company } from './shared/sdk/models/Company';
import { Compensation } from './shared/sdk/models/Compensation';
import { Contact } from './shared/sdk/models/Contact';
import { Equity } from './shared/sdk/models/Equity';
import { Person } from './shared/sdk/models/Person';
import { Recruiter } from './shared/sdk/models/Recruiter';
import { Salary } from './shared/sdk/models/Salary';

import { JobApi } from './shared/sdk/services/custom/Job';

@Injectable()
export class JobService {

  constructor(private jobApi: JobApi) { }

  newJob() : Job {
    let job = new Job();
    job.company = new Company();
    job.recruiter = new Recruiter();
    job.compensation = new Compensation();
    job.compensation.salary = new Salary();
    job.compensation.equity = new Equity();
    job.contacts = [];

    return job;
  }

  create(job: Job) : Observable<Job> {
    return this.jobApi.create(job);
  }
  findById(id: any) : Observable<Job> {
    return this.jobApi.findById(id);
  }

  findAll() : Observable<Job[]> {
    return this.jobApi.find();
  }

  deleteById(id : any) : Observable<Job> {
    return this.jobApi.deleteById(id);
  }

  update(job: Job) : Observable<Job> {
    return this.jobApi.replaceById(job.id, job);
  }

  search(term: string) {
    return this.jobApi.find({"where": {"company.name": {"like": term, "options": "i"}}});
  }
}
