import { Http, Headers, Request } from '@angular/http';

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
import { ContactApi } from './shared/sdk/services/custom/Contact';

import { LoopBackConfig } from './shared/sdk/lb.config';

@Injectable()
export class JobService {

  constructor(private jobApi: JobApi, public contactApi: ContactApi, private http : Http) { }

  newJob() : Job {
    let job = new Job();
    job.title = undefined;
    job.location = undefined;
    job.description = undefined;
    job.url = undefined;
    job.status = undefined;
    job.isActive = true;
    job.company = new Company();
    job.company.name = undefined;
    job.company.description = undefined;
    job.recruiter = new Recruiter();
    job.recruiter.name = undefined;
    job.recruiter.company = undefined;
    job.compensation = new Compensation();
    job.compensation.salary = new Salary();
    job.compensation.salary.minAnnual = undefined;
    job.compensation.salary.maxAnnual = undefined;
    job.compensation.equity = new Equity();
    job.compensation.equity.minPercent = undefined;
    job.compensation.equity.maxPercent= undefined;
    job.compensation.other = undefined;
    job.contacts = [];
    job.createdAt = undefined;
    job.updatedAt = undefined;

    return job;
  }

  makeDeep(job: Job) : Job {
    job.company = job.company || new Company();
    job.recruiter = job.recruiter || new Recruiter();
    job.compensation = job.compensation || new Compensation();
    job.compensation.salary = job.compensation.salary || new Salary();
    job.compensation.equity = job.compensation.equity || new Equity();
    job.contacts = job.contacts || [];

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

  search(term: string) : Observable<Job[]> {
    return this.jobApi.find({"where": {"company.name": {"like": term, "options": "i"}}});
  }
}
