/* tslint:disable */

declare var Object: any;
export interface RecruiterInterface {
  name?: string;
  company?: string;
}

export class Recruiter implements RecruiterInterface {
  name: string;
  company: string;
  constructor(data?: RecruiterInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Recruiter`.
   */
  public static getModelName() {
    return "Recruiter";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Recruiter for dynamic purposes.
  **/
  public static factory(data: RecruiterInterface): Recruiter{
    return new Recruiter(data);
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
      name: 'Recruiter',
      plural: 'Recruiters',
      properties: {
        name: {
          name: 'name',
          type: 'string'
        },
        company: {
          name: 'company',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
