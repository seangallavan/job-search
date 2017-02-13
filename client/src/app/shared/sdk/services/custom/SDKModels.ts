/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Recruiter } from '../../models/Recruiter';
import { Company } from '../../models/Company';
import { Salary } from '../../models/Salary';
import { Equity } from '../../models/Equity';
import { Compensation } from '../../models/Compensation';
import { Person } from '../../models/Person';
import { Contact } from '../../models/Contact';
import { Job } from '../../models/Job';
import { Upload } from '../../models/Upload';
import { Mapping } from '../../models/Mapping';
import { Importer } from '../../models/Importer';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Recruiter: Recruiter,
    Company: Company,
    Salary: Salary,
    Equity: Equity,
    Compensation: Compensation,
    Person: Person,
    Contact: Contact,
    Job: Job,
    Upload: Upload,
    Mapping: Mapping,
    Importer: Importer,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
