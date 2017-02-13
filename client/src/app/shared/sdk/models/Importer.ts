/* tslint:disable */

declare var Object: any;
export interface ImporterInterface {
  filename: string;
  mappings?: Array<any>;
}

export class Importer implements ImporterInterface {
  filename: string;
  mappings: Array<any>;
  constructor(data?: ImporterInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Importer`.
   */
  public static getModelName() {
    return "Importer";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Importer for dynamic purposes.
  **/
  public static factory(data: ImporterInterface): Importer{
    return new Importer(data);
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
      name: 'Importer',
      plural: 'Importers',
      properties: {
        filename: {
          name: 'filename',
          type: 'string'
        },
        mappings: {
          name: 'mappings',
          type: 'Array&lt;any&gt;'
        },
      },
      relations: {
      }
    }
  }
}
