/* tslint:disable */

declare var Object: any;
export interface UploadInterface {
  id?: number;
}

export class Upload implements UploadInterface {
  id: number;
  constructor(data?: UploadInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Upload`.
   */
  public static getModelName() {
    return "Upload";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Upload for dynamic purposes.
  **/
  public static factory(data: UploadInterface): Upload{
    return new Upload(data);
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
      name: 'Upload',
      plural: 'Uploads',
      properties: {
        id: {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
