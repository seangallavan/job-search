/* tslint:disable */
import {
  Contact
} from '../index';

declare var Object: any;
export interface JobInterface {
  recruiter?: any;
  company?: any;
  title?: string;
  compensation?: any;
  location?: string;
  description?: string;
  url?: string;
  status?: string;
  isActive?: boolean;
  id?: any;
  createdAt?: Date;
  updatedAt?: Date;
  contacts?: Contact[];
}

export class Job implements JobInterface {
  recruiter: any;
  company: any;
  title: string;
  compensation: any;
  location: string;
  description: string;
  url: string;
  status: string;
  isActive: boolean;
  id: any;
  createdAt: Date;
  updatedAt: Date;
  contacts: Contact[];
  constructor(data?: JobInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Job`.
   */
  public static getModelName() {
    return "Job";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Job for dynamic purposes.
  **/
  public static factory(data: JobInterface): Job{
    return new Job(data);
  }  
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Job',
      plural: 'Jobs',
      properties: {
        recruiter: {
          name: 'recruiter',
          type: 'any'
        },
        company: {
          name: 'company',
          type: 'any'
        },
        title: {
          name: 'title',
          type: 'string'
        },
        compensation: {
          name: 'compensation',
          type: 'any'
        },
        location: {
          name: 'location',
          type: 'string'
        },
        description: {
          name: 'description',
          type: 'string'
        },
        url: {
          name: 'url',
          type: 'string'
        },
        status: {
          name: 'status',
          type: 'string'
        },
        isActive: {
          name: 'isActive',
          type: 'boolean'
        },
        id: {
          name: 'id',
          type: 'any'
        },
        createdAt: {
          name: 'createdAt',
          type: 'Date'
        },
        updatedAt: {
          name: 'updatedAt',
          type: 'Date'
        },
      },
      relations: {
        contacts: {
          name: 'contacts',
          type: 'Contact[]',
          model: 'Contact'
        },
      }
    }
  }
}
