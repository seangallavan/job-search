/* tslint:disable */

declare var Object: any;
export interface SalaryInterface {
  minAnnual?: number;
  maxAnnual?: number;
}

export class Salary implements SalaryInterface {
  minAnnual: number;
  maxAnnual: number;
  constructor(data?: SalaryInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Salary`.
   */
  public static getModelName() {
    return "Salary";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Salary for dynamic purposes.
  **/
  public static factory(data: SalaryInterface): Salary{
    return new Salary(data);
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
      name: 'Salary',
      plural: 'Salaries',
      properties: {
        minAnnual: {
          name: 'minAnnual',
          type: 'number'
        },
        maxAnnual: {
          name: 'maxAnnual',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
