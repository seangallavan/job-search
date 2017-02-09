/* tslint:disable */

declare var Object: any;
export interface EquityInterface {
  minPercent?: number;
  maxPercent?: number;
}

export class Equity implements EquityInterface {
  minPercent: number;
  maxPercent: number;
  constructor(data?: EquityInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Equity`.
   */
  public static getModelName() {
    return "Equity";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Equity for dynamic purposes.
  **/
  public static factory(data: EquityInterface): Equity{
    return new Equity(data);
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
      name: 'Equity',
      plural: 'Equities',
      properties: {
        minPercent: {
          name: 'minPercent',
          type: 'number'
        },
        maxPercent: {
          name: 'maxPercent',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
