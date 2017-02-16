/* tslint:disable */
import {
  Job
} from '../index';

declare var Object: any;
export interface ContactInterface {
  person?: any;
  type?: string;
  notes?: string;
  id?: any;
  createdAt?: Date;
  updatedAt?: Date;
  jobId?: any;
  job?: Job;
}

export class Contact implements ContactInterface {
  person: any;
  type: string;
  notes: string;
  id: any;
  createdAt: Date;
  updatedAt: Date;
  jobId: any;
  job: Job;
  constructor(data?: ContactInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Contact`.
   */
  public static getModelName() {
    return "Contact";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Contact for dynamic purposes.
  **/
  public static factory(data: ContactInterface): Contact{
    return new Contact(data);
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
      name: 'Contact',
      plural: 'Contacts',
      properties: {
        person: {
          name: 'person',
          type: 'any'
        },
        type: {
          name: 'type',
          type: 'string'
        },
        notes: {
          name: 'notes',
          type: 'string'
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
        jobId: {
          name: 'jobId',
          type: 'any'
        },
      },
      relations: {
        job: {
          name: 'job',
          type: 'Job',
          model: 'Job'
        },
      }
    }
  }
}
