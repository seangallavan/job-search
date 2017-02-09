/* tslint:disable */

declare var Object: any;
export interface CompensationInterface {
  salary?: any;
  equity?: any;
  other?: string;
}

export class Compensation implements CompensationInterface {
  salary: any;
  equity: any;
  other: string;
  constructor(data?: CompensationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Compensation`.
   */
  public static getModelName() {
    return "Compensation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Compensation for dynamic purposes.
  **/
  public static factory(data: CompensationInterface): Compensation{
    return new Compensation(data);
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
      name: 'Compensation',
      plural: 'Compensations',
      properties: {
        salary: {
          name: 'salary',
          type: 'any'
        },
        equity: {
          name: 'equity',
          type: 'any'
        },
        other: {
          name: 'other',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
