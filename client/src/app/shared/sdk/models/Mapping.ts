/* tslint:disable */

declare var Object: any;
export interface MappingInterface {
  destination: string;
  source: string;
}

export class Mapping implements MappingInterface {
  destination: string;
  source: string;
  constructor(data?: MappingInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Mapping`.
   */
  public static getModelName() {
    return "Mapping";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Mapping for dynamic purposes.
  **/
  public static factory(data: MappingInterface): Mapping{
    return new Mapping(data);
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
      name: 'Mapping',
      plural: 'Mappings',
      properties: {
        destination: {
          name: 'destination',
          type: 'string'
        },
        source: {
          name: 'source',
          type: 'string'
        },
      },
      relations: {
      }
    }
  }
}
